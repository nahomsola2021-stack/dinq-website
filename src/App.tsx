/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { BookingProvider, useBooking } from './context/BookingContext';
import { BookingModal } from './components/booking/BookingModal';
import { Compass } from 'lucide-react';

// --- ADMIN DASHBOARD IMPORTS ---
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AdminLayout } from './admin/layouts/AdminLayout';
// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminOverview = lazy(() => import('./admin/pages/Overview').then(m => ({ default: m.Overview })));
const AdminTours = lazy(() => import('./admin/pages/ToursManager').then(m => ({ default: m.ToursManager })));
const AdminDestinations = lazy(() => import('./admin/pages/DestinationsManager').then(m => ({ default: m.DestinationsManager })));
const AdminBookings = lazy(() => import('./admin/pages/BookingsManager').then(m => ({ default: m.BookingsManager })));
const AdminShop = lazy(() => import('./admin/pages/ShopManager').then(m => ({ default: m.ShopManager })));
const AdminOrders = lazy(() => import('./admin/pages/OrdersManager').then(m => ({ default: m.OrdersManager })));
const AdminMigration = lazy(() => import('./admin/pages/DataMigration').then(m => ({ default: m.DataMigration })));
const AdminContent = lazy(() => import('./admin/pages/WebsiteContent').then(m => ({ default: m.WebsiteContent })));
// -------------------------------

// Lazy-loaded public pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Tours = lazy(() => import('./pages/Tours').then(m => ({ default: m.Tours })));
const TourDetails = lazy(() => import('./pages/TourDetails').then(m => ({ default: m.TourDetails })));
const Destinations = lazy(() => import('./pages/Destinations').then(m => ({ default: m.Destinations })));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail').then(m => ({ default: m.DestinationDetail })));
const Experiences = lazy(() => import('./pages/Experiences').then(m => ({ default: m.Experiences })));
const Safari = lazy(() => import('./pages/Safari').then(m => ({ default: m.Safari })));
const Mountains = lazy(() => import('./pages/Mountains').then(m => ({ default: m.Mountains })));
const Birding = lazy(() => import('./pages/Birding').then(m => ({ default: m.Birding })));
const Festivals = lazy(() => import('./pages/Festivals').then(m => ({ default: m.Festivals })));
const ShewaLandEscape = lazy(() => import('./pages/ShewaLandEscape').then(m => ({ default: m.ShewaLandEscape })));
const KundudoBabile = lazy(() => import('./pages/KundudoBabile').then(m => ({ default: m.KundudoBabile })));
const SignatureRoutes = lazy(() => import('./pages/SignatureRoutes').then(m => ({ default: m.SignatureRoutes })));
const ProgrammePage = lazy(() => import('./pages/ProgrammePage').then(m => ({ default: m.ProgrammePage })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

// Generic Component for pending admin modules
const AdminPlaceholder = ({ title }: { title: string }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-10 shadow-sm animate-in fade-in">
    <h2 className="text-xl font-bold text-slate-900 mb-2">{title} Module</h2>
    <p className="text-sm text-slate-500 mb-6">This operational section is wired into the DinqOS routing table and ready for customization.</p>
    <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 text-xs font-mono font-semibold rounded-lg">
      Status: Active & Protected by RBAC
    </div>
  </div>
);

// Redirect helper for /plan-your-trip that opens the booking modal
function PlanYourTripRedirect() {
  const { openBooking } = useBooking();

  useEffect(() => {
    openBooking();
  }, [openBooking]);

  return <Navigate to="/tours" replace />;
}

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Loading Fallback
function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F5E9DA] text-[#302019]">
      <Compass className="h-10 w-10 text-[#D95F49] animate-spin" />
      <span className="font-serif text-sm tracking-widest uppercase mt-4 text-[#D95F49]">
        Dinq Ethiopia
      </span>
    </div>
  );
}

// Admin Loading Fallback (Neutral UI)
function AdminLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
      <div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin" />
    </div>
  );
}

// --- PUBLIC LAYOUT WRAPPER ---
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-screen flex-col bg-[#F5E9DA] text-[#302019]">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#302019] focus:text-[#F5E9DA] focus:px-4 focus:py-2 focus:text-xs"
    >
      Skip to main content
    </a>
    <Navbar />
    <main id="main-content" className="flex-1">
      {children}
    </main>
    <Footer />
    <FloatingWhatsApp />
    <BookingModal />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ============================================================
                ADMIN DASHBOARD ROUTES (Wrapped in AuthProvider)
            ============================================================ */}
            <Route path="/admin/login" element={
              <Suspense fallback={<AdminLoader />}><AdminLogin /></Suspense>
            } />
            
            <Route path="/admin" element={
              <AdminAuthProvider>
                <Suspense fallback={<AdminLoader />}>
                  <AdminLayout />
                </Suspense>
              </AdminAuthProvider>
            }>
              {/* Nested Admin Routes inside the Dashboard Shell */}
              <Route index element={<AdminOverview />} />
              <Route path="tours" element={<AdminTours />} />
              <Route path="destinations" element={<AdminDestinations />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="shop" element={<AdminShop />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminPlaceholder title="Customer Directory" />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="media" element={<AdminPlaceholder title="Media Library & Cloudinary Hub" />} />
              <Route path="reviews" element={<AdminPlaceholder title="Customer Reviews Moderation" />} />
              <Route path="analytics" element={<AdminPlaceholder title="Analytics & Financial Reports" />} />
              <Route path="migration" element={<AdminMigration />} />
              <Route path="users" element={<AdminPlaceholder title="Users & Permissions Matrix" />} />
              <Route path="settings" element={<AdminPlaceholder title="System Settings" />} />
            </Route>

            {/* ============================================================
                PUBLIC WEBSITE ROUTES 
            ============================================================ */}
            <Route element={<PublicLayout><Outlet /></PublicLayout>}>
              <Route path="/" element={<Home />} />
              
              {/* Tours Routes */}
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetails />} />
              
              {/* Destinations Routes */}
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:slug" element={<DestinationDetail />} />
              
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/safari" element={<Safari />} />
              <Route path="/mountains" element={<Mountains />} />
              <Route path="/birding" element={<Birding />} />
              <Route path="/festivals" element={<Festivals />} />
              <Route path="/shewa-land-escape" element={<ShewaLandEscape />} />
              <Route path="/kundudo-babile" element={<KundudoBabile />} />
              <Route path="/signature-routes" element={<SignatureRoutes />} />
              <Route path="/journeys/:slug" element={<ProgrammePage />} />
              <Route path="/shop" element={<Shop />} />

              {/* Unified About page */}
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Navigate to="/about#services" replace />} />
              <Route path="/why-ethiopia" element={<Navigate to="/about#why-ethiopia" replace />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/plan-your-trip" element={<PlanYourTripRedirect />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Suspense>
      </BookingProvider>
    </BrowserRouter>
  );
}