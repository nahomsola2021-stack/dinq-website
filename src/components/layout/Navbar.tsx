import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Compass, MessageCircle } from 'lucide-react';
import { MAIN_NAV } from '../../data/content/navigation';
import { waLink } from '../../lib/whatsapp';
import { useBooking } from '../../context/BookingContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const whatsappHref = waLink('Hello Dinq Tour, Travel & Events! I would like to inquire about planning an expedition.');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-dark py-2 sm:py-3 shadow-lg shadow-black/20'
          : 'bg-gradient-to-b from-[#1F1713]/85 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Brand, Main Links (including Home), Action button */}
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Logo */}
          <Link
            to="/"
            className="flex items-center whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="Dinq Tour and Events"
          >
            <img
              src="/logo.png"
              alt="Dinq Tour and Events"
              className={`object-contain transition-all duration-500 ease-in-out group-hover:scale-[1.03] ${
                scrolled ? 'h-12 w-12 sm:h-16 sm:w-16' : 'h-20 w-20 sm:h-28 sm:w-28'
              }`}
            />
          </Link>

          {/* Zone 2: Navigation Links (with Home) */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#FAF7F2]/90"
          >
            {MAIN_NAV.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              if (hasChildren) {
                return (
                  <div
                    key={item.label}
                    className="relative group py-2"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={activeDropdown === item.label}
                      className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none ${
                        isActive ? 'text-[#D95F49] font-semibold' : 'hover:text-[#DDAA42]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-[#D95F49] transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* Dropdown menu */}
                    <div className="absolute top-full left-0 w-72 rounded-lg bg-[#241C18]/95 p-3 shadow-2xl backdrop-blur-xl border border-[#3D3028] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                      <div className="space-y-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block rounded-md p-2 text-left transition-colors hover:bg-white/5"
                          >
                            <span className="block text-xs font-semibold text-[#FAF7F2] hover:text-[#D95F49]">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="block text-[11px] text-[#F5E9DA]/65 line-clamp-1 mt-0.5 font-light">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#DDAA42] ${
                    isActive ? 'text-[#D95F49] font-semibold' : 'text-[#FAF7F2]/90'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (Simple Booking Modal) & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Contact"
              className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/15 text-[#DDAA42] hover:border-[#D95F49] hover:text-[#FAF7F2] transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#D95F49]" />
            </a>

            <button
              onClick={() => openBooking()}
              className="btn-terracotta !py-2 !px-4 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5 inline mr-1" />
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book an Expedition</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF7F2] hover:text-[#DDAA42] transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-[#1F1713] border-b border-[#3D3028] px-6 py-6 shadow-2xl">
          <nav className="space-y-3.5">
            {MAIN_NAV.map((item) => (
              <div key={item.label} className="border-b border-white/5 pb-2.5">
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-[#FAF7F2] hover:text-[#D95F49]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-2 space-y-1.5 pl-3 border-l border-[#D95F49]/40">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-0.5 text-xs text-[#F5E9DA]/75 hover:text-[#FAF7F2]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="btn-terracotta w-full text-center"
              >
                Book an Expedition
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold w-full text-center !text-[#FAF7F2] !border-white/20"
              >
                Chat on WhatsApp (+251 913 817 153)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
