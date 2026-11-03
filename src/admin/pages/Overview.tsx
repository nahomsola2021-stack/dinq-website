// src/admin/pages/Overview.tsx
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, CalendarCheck, ShoppingBag, 
  ArrowUpRight, Clock, MapPin, CheckCircle2, 
  AlertCircle, Plus, Loader2
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Link } from 'react-router-dom';

export const Overview: React.FC = () => {
  const { adminData } = useAdminAuth();
  const firstName = adminData?.displayName?.split(' ')[0] || 'Admin';

  // --- LIVE DATA STATES ---
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    revenue: 0,
    activeBookings: 0,
    shopOrders: 0, 
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);

  // --- FETCH LIVE FIREBASE DATA ---
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        // 1. Fetch recent bookings (limit 5) for the table
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        
        const fetchedBookings: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBookings.push({
            id: doc.id,
            reference: data.reference || `DQ-${doc.id.substring(0, 6).toUpperCase()}`,
            name: data.fullName || data.customerName || 'Unknown Traveler',
            tour: data.tourName || 'Custom Expedition',
            date: data.dates || data.travelDate || 'Flexible',
            status: data.status || 'New',
            amount: data.totalPrice || 0,
          });
        });

        // 2. Fetch ALL bookings to calculate Total Revenue, Active Bookings, and Unique Customers
        let totalRev = 0;
        let activeCount = 0;
        const uniqueEmails = new Set();
        
        const allBookingsSnapshot = await getDocs(collection(db, 'bookings'));
        allBookingsSnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Track unique customers by email
          if (data.email) uniqueEmails.add(data.email.toLowerCase());

          // Track active revenue and counts
          if (data.status !== 'Cancelled') {
            activeCount++;
            totalRev += (Number(data.totalPrice) || 0);
          }
        });

        // 3. Fetch real Shop Orders count
        let ordersCount = 0;
        try {
          const ordersSnapshot = await getDocs(collection(db, 'orders'));
          ordersCount = ordersSnapshot.size;
          
          // Add shop customers to our unique customer pool
          ordersSnapshot.forEach(doc => {
            if (doc.data().email) uniqueEmails.add(doc.data().email.toLowerCase());
            if (doc.data().status !== 'Cancelled' && doc.data().status !== 'Refunded') {
              totalRev += (Number(doc.data().totalPrice) || 0);
            }
          });
        } catch (e) {
          console.log("Orders collection might be empty or missing yet.", e);
        }

        // 4. Fetch standalone registered customers (if any exist)
        try {
          const customersSnapshot = await getDocs(collection(db, 'customers'));
          customersSnapshot.forEach(doc => {
            if (doc.data().email) uniqueEmails.add(doc.data().email.toLowerCase());
          });
        } catch (e) {
          console.log("Customers collection might be empty.", e);
        }

        setRecentBookings(fetchedBookings);
        setStats({
          revenue: totalRev,
          activeBookings: activeCount,
          shopOrders: ordersCount,
          totalCustomers: uniqueEmails.size
        });

      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const STATS_CARDS = [
    { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, trend: 'Live', isUp: true, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Bookings', value: stats.activeBookings.toString(), trend: 'Live', isUp: true, icon: CalendarCheck, color: 'bg-blue-50 text-blue-600' },
    { label: 'Shop Orders', value: stats.shopOrders.toString(), trend: 'Live', isUp: true, icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Customers', value: stats.totalCustomers.toLocaleString(), trend: 'Live', isUp: true, icon: Users, color: 'bg-purple-50 text-purple-600' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 mb-4" />
        <p className="text-sm font-medium">Loading Live Dashboard Metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10 animate-in fade-in">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {firstName}.
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
            Here is what's happening with Dinq Ethiopia Tours today. You have <strong className="text-slate-900">{stats.activeBookings} active bookings</strong> requiring attention.
          </p>
        </div>
        <div className="relative z-10 flex gap-3 shrink-0">
          <Link to="/admin/bookings" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            View Bookings
          </Link>
          <Link to="/admin/tours" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            <span>New Tour</span>
          </Link>
        </div>
        
        {/* Decorative Background Pattern */}
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        <MapPin className="absolute -right-6 -bottom-6 h-48 w-48 text-slate-900/5 rotate-12 pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS_CARDS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-slate-300 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {stat.isUp && <ArrowUpRight className="h-3 w-3" />}
                  {stat.trend}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Bookings & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-400" /> Recent Bookings
            </h3>
            <Link to="/admin/bookings" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="font-medium px-6 py-3">Client</th>
                  <th className="font-medium px-6 py-3">Expedition</th>
                  <th className="font-medium px-6 py-3">Status</th>
                  <th className="font-medium px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{booking.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{booking.reference}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900 truncate max-w-[200px]" title={booking.tour}>{booking.tour}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{booking.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          booking.status === 'Confirmed' || booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          booking.status === 'Pending' || booking.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          booking.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {booking.status === 'Confirmed' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900">
                        ${booking.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No recent bookings found. Wait for customers to submit requests!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Quick Links */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                  <span className="text-sm font-medium text-slate-700">Public Website</span>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                  <span className="text-sm font-medium text-slate-700">Firebase Firestore</span>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-bold">SYNCED</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                  <span className="text-sm font-medium text-slate-700">Cloudinary Media</span>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-bold">READY</span>
              </div>
            </div>
          </div>
          
          {/* Support Card */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Need Assistance?</h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Contact your lead developer or review the DinqOS system documentation.
              </p>
              <a href="mailto:support@dinqethiopia.com" className="inline-block w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-center text-sm font-medium transition-colors">
                Contact Tech Support
              </a>
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
};