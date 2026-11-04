// src/admin/layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarCheck, Map, MapPin, ShoppingBag, 
  Bell, Search, ExternalLink, Menu, X, LogOut
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const NAV_GROUPS = [
  {
    title: 'Core',
    items: [
      { name: 'Overview', path: '/admin', icon: LayoutDashboard },
      { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    ]
  },
  {
    title: 'Tourism Catalog',
    items: [
      { name: 'Tour Management', path: '/admin/tours', icon: Map },
      { name: 'Destinations', path: '/admin/destinations', icon: MapPin },
    ]
  },
  {
    title: 'Commerce',
    items: [
      { name: 'Shop Management', path: '/admin/shop', icon: ShoppingBag },
    ]
  }
];

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { adminData, logout } = useAdminAuth();
  const location = useLocation();

  if (!adminData) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Unauthorized Access</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#241C18] border-r border-[#49362B] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#49362B]">
          <span className="font-serif text-xl font-bold tracking-tight text-[#FAF7F2]">Dinq<span className="font-sans font-light text-[#DDAA42]">OS</span></span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#C7B5A7] hover:text-[#DDAA42]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 no-scrollbar">
          {NAV_GROUPS.map((group, idx) => (
            <div key={idx}>
              <h4 className="px-3 text-xs font-semibold text-[#DDAA42] uppercase tracking-wider mb-2">{group.title}</h4>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-[#D95F49] text-white shadow-sm shadow-black/20'
                          : 'text-[#E7D7CA] hover:bg-[#3A2B23] hover:text-[#DDAA42]'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#C7A58C]'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#49362B]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-[#DDAA42] text-[#241C18] flex items-center justify-center text-xs font-bold uppercase">
              {adminData?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#FAF7F2] truncate">{adminData?.displayName || 'Admin User'}</p>
              <p className="text-xs text-[#C7B5A7] truncate capitalize">{adminData?.role?.replace('_', ' ') || 'Admin'}</p>
            </div>
            <button onClick={logout} className="text-[#C7B5A7] hover:text-[#D95F49] transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-900">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Global search (Cmd+K)..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Dynamic View Injection */}
        <div className="flex-1 overflow-auto bg-slate-50/50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};