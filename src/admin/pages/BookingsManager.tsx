// src/admin/pages/BookingsManager.tsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, CalendarCheck, Users, DollarSign, 
  MapPin, Mail, Phone, Clock, CheckCircle2, AlertCircle, 
  ChevronLeft, FileText, Download, Save, MoreHorizontal, Edit2, Loader2, Trash2
} from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// --- TYPES ---
type BookingStatus = 'New' | 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
type PaymentStatus = 'Unpaid' | 'Deposit Paid' | 'Fully Paid' | 'Refunded';

interface Booking {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  phone: string;
  tourName: string;
  travelDate: string;
  endDate: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests: string;
  internalNotes: string;
  createdAt: string;
}

export const BookingsManager: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // State for the currently selected booking
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // --- FETCH LIVE BOOKINGS FROM FIREBASE ---
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const dbBookings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          reference: data.reference || `DQ-${doc.id.substring(0, 6).toUpperCase()}`,
          customerName: data.fullName || data.customerName || 'Unknown Traveler',
          email: data.email || 'No email provided',
          phone: data.phone || 'No phone provided',
          tourName: data.tourName || 'Custom Expedition',
          travelDate: data.dates || data.travelDate || 'Flexible',
          endDate: data.endDate || '',
          adults: data.adults || (data.guestCount ? parseInt(data.guestCount) : 1) || 1,
          children: data.children || 0,
          totalPrice: data.totalPrice || 0,
          status: (data.status as BookingStatus) || 'New',
          paymentStatus: (data.paymentStatus as PaymentStatus) || 'Unpaid',
          specialRequests: data.notes || data.specialRequests || '',
          internalNotes: data.internalNotes || '',
          createdAt: data.createdAt || new Date().toISOString(),
        } as Booking;
      });
      
      // Sort newest first
      dbBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(dbBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setActiveBooking({ ...booking });
    setView('detail');
  };

  const handleStatusChange = (newStatus: BookingStatus) => {
    if (activeBooking) {
      setActiveBooking({ ...activeBooking, status: newStatus });
    }
  };

  const handlePaymentChange = (newPaymentStatus: PaymentStatus) => {
    if (activeBooking) {
      setActiveBooking({ ...activeBooking, paymentStatus: newPaymentStatus });
    }
  };

  const handleSaveChanges = async () => {
    if (!activeBooking) return;
    setSaving(true);
    try {
      // Create a payload mapped back to standard db fields
      const payload = {
        status: activeBooking.status,
        paymentStatus: activeBooking.paymentStatus,
        internalNotes: activeBooking.internalNotes,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'bookings', activeBooking.id), payload, { merge: true });
      
      // Update local state grid so we don't have to refetch
      setBookings(prev => prev.map(b => b.id === activeBooking.id ? activeBooking : b));
      alert("✅ Booking updated successfully!");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("❌ Failed to save booking updates.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBooking = async (booking: Booking) => {
    if (!window.confirm(`Permanently delete booking ${booking.reference} for ${booking.customerName}? This cannot be undone.`)) return;

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'bookings', booking.id));
      setBookings(current => current.filter(item => item.id !== booking.id));
      setActiveBooking(null);
      setView('list');
      alert('✅ Booking permanently deleted.');
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('❌ Failed to delete booking.');
    } finally {
      setDeleting(false);
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'New':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  // Payment Badge Helper
  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Fully Paid': return 'bg-emerald-100 text-emerald-800';
      case 'Deposit Paid': return 'bg-blue-100 text-blue-800';
      case 'Refunded': return 'bg-slate-100 text-slate-800';
      case 'Unpaid':
      default: return 'bg-rose-100 text-rose-800';
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 mb-4" />
        <p className="text-sm font-medium">Fetching Live Booking Requests...</p>
      </div>
    );
  }

  // --- LIST VIEW ---
  if (view === 'list') {
    const filteredBookings = bookings.filter(b => {
      const matchesSearch = b.reference.toLowerCase().includes(search.toLowerCase()) || 
                            b.customerName.toLowerCase().includes(search.toLowerCase()) ||
                            b.tourName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10 animate-in fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reservations</h1>
            <p className="text-sm text-slate-500 mt-1">Manage expedition requests, client details, and payments.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Toolbar & Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by reference, name, or tour..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              {['All', 'New', 'Pending', 'Confirmed', 'Completed'].map((stat) => (
                <button
                  key={stat}
                  onClick={() => setStatusFilter(stat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    statusFilter === stat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="font-medium px-6 py-4">Booking Ref</th>
                  <th className="font-medium px-6 py-4">Customer</th>
                  <th className="font-medium px-6 py-4">Tour & Dates</th>
                  <th className="font-medium px-6 py-4">Status</th>
                  <th className="font-medium px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-medium text-slate-900">{booking.reference}</span>
                      <div className="text-[11px] text-slate-500 mt-1">Booked: {new Date(booking.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{booking.customerName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium truncate max-w-[200px]" title={booking.tourName}>{booking.tourName}</div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <CalendarCheck className="h-3 w-3" /> {booking.travelDate.length > 20 ? booking.travelDate.substring(0, 20) + '...' : booking.travelDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPaymentBadge(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View & Edit Booking"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking)}
                          className="inline-flex items-center justify-center p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Permanently delete booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW ---
  if (!activeBooking) return null;

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 animate-in fade-in">
      
      {/* Sticky Top Action Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-4 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('list')}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Back to List"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {activeBooking.customerName}
              </h2>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPaymentBadge(activeBooking.paymentStatus)}`}>
                {activeBooking.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Ref: {activeBooking.reference} · Booked {new Date(activeBooking.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDeleteBooking(activeBooking)}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-3 py-2 border border-rose-200 bg-rose-50 text-rose-700 text-sm font-medium rounded-lg hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-60"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{deleting ? 'Deleting...' : 'Delete'}</span>
          </button>
          <select
            value={activeBooking.status}
            onChange={(e) => handleStatusChange(e.target.value as BookingStatus)}
            className={`px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer ${getStatusBadge(activeBooking.status)}`}
          >
            <option value="New">Status: New</option>
            <option value="Pending">Status: Pending</option>
            <option value="Confirmed">Status: Confirmed</option>
            <option value="In Progress">Status: In Progress</option>
            <option value="Completed">Status: Completed</option>
            <option value="Cancelled">Status: Cancelled</option>
          </select>

          <button 
            onClick={handleSaveChanges}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer disabled:opacity-75"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Customer & Tour Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-400" /> Client Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <div className="text-sm font-medium text-slate-900">{activeBooking.customerName}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact</label>
                <div className="space-y-1.5">
                  <a href={`mailto:${activeBooking.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <Mail className="h-3.5 w-3.5" /> {activeBooking.email}
                  </a>
                  <a href={`https://wa.me/${activeBooking.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-600 transition-colors">
                    <Phone className="h-3.5 w-3.5" /> {activeBooking.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Expedition Details Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-slate-400" /> Expedition Details
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Selected Tour</span>
              <span className="text-base font-serif font-medium text-slate-900">{activeBooking.tourName}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Dates</label>
                <div className="text-sm font-medium text-slate-900">{activeBooking.travelDate}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Party Size</label>
                <div className="text-sm font-medium text-slate-900">{activeBooking.adults} Guests</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Special Requests / Notes from Client</label>
              <div className="p-3 bg-amber-50 border border-amber-100 text-amber-900 text-sm rounded-lg whitespace-pre-wrap">
                {activeBooking.specialRequests || 'No special requests provided.'}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Financials & Admin Notes */}
        <div className="space-y-6">
          
          {/* Financial Summary */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-slate-400" /> Payment Status
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Update Payment Tracker</label>
                <select
                  value={activeBooking.paymentStatus}
                  onChange={(e) => handlePaymentChange(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 bg-white"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Deposit Paid">Deposit Paid (Partial)</option>
                  <option value="Fully Paid">Fully Paid</option>
                  <option value="Refunded">Refunded</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-2">Currently, payments are handled off-platform via bank transfer or POS. Use this to track status.</p>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-400" /> Internal Notes
            </h3>
            <textarea
              rows={8}
              value={activeBooking.internalNotes}
              onChange={(e) => setActiveBooking({...activeBooking, internalNotes: e.target.value})}
              placeholder="Add private notes for guides, dispatch team, or required permit tracking... (Not visible to client)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 resize-y"
            />
            <p className="text-[10px] text-slate-500 mt-2">These notes are only visible to logged-in admins.</p>
          </div>

        </div>
      </div>
    </div>
  );
};