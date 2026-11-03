import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { FOOTER_SECTIONS } from '../../data/content/navigation';
import { DINQ_PHONE_DISPLAY, DINQ_EMAIL, DINQ_OFFICE_ADDRESS, waLink } from '../../lib/whatsapp';

export const Footer: React.FC = () => {
  const whatsappHref = waLink('Hello Dinq Tour, Travel & Events! I would like to make an inquiry.');

  return (
    <footer className="relative bg-[#0E0D0B] text-[#FAF7F2] border-t border-white/10 grain pt-14 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      <div className="absolute inset-0 gold-glow opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex rounded-2xl focus:outline-none group">
              <img src="/logo.png" alt="Dinq Tour and Events" className="h-28 w-32 sm:h-32 sm:w-36 object-contain transition-transform group-hover:scale-[1.02]" />
            </Link>

            <p className="text-xs uppercase tracking-[0.25em] text-[#C88A2E] font-semibold">
              Dinq Tour, Travel & Events
            </p>

            <p className="text-sm font-light text-[#E7E1D7]/75 leading-relaxed max-w-md">
              10+ years of pioneering curated expeditions, mountain ascents, cultural festivals, and bespoke event management across the extraordinary landscapes of Ethiopia.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-[#E7E1D7]/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#C88A2E] shrink-0" />
                <span>{DINQ_OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#C88A2E] shrink-0" />
                <span>{DINQ_PHONE_DISPLAY}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#C88A2E] shrink-0" />
                <span>{DINQ_EMAIL}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#C88A2E]/50 bg-[#C88A2E]/10 px-4 py-2 text-xs font-semibold text-[#D4AF7A] hover:bg-[#C88A2E] hover:text-[#0E0D0B] transition-colors"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span>Direct WhatsApp Inquiries</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-[#FAF7F2] tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E7E1D7]/75 font-light">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="hover:text-[#D4AF7A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Outdoor Brands & Signature Concepts */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-6 border-b border-white/5 text-xs text-[#E7E1D7]/60">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[#C88A2E] font-medium">Affiliated Signature Brands:</span>
            <Link to="/mountains" className="hover:text-[#FAF7F2] transition-colors">
              Blue Nile Hiking
            </Link>
            <span>·</span>
            <Link to="/journeys/urban-camping" className="hover:text-[#FAF7F2] transition-colors">
              Urban Camping Ethiopia
            </Link>
          </div>

          <div className="font-serif italic text-sm text-[#D4AF7A]">
            One Country. Many Worlds.
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E7E1D7]/50 font-light">
          <p>© {new Date().getFullYear()} Dinq Tour, Travel & Events. All rights reserved.</p>
          <p>Discover the Places · Meet the People · Live the Story.</p>
        </div>
      </div>

      {/* 3px Ethiopian Tri-Colour line brand motif at bottom */}
      <div className="eth-line absolute bottom-0 left-0 right-0 z-20" />
    </footer>
  );
};
