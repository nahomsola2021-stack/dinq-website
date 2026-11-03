// src/pages/Services.tsx
import React, { useEffect } from 'react';
import { Briefcase, Compass, Plane, Sparkles, Handshake } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { PageHero } from '../components/premium/PageHero';
import { CheckList } from '../components/premium/CheckList';
import { CTABand } from '../components/premium/CTABand';
import { SERVICES_DATA, PARTNERSHIP_TYPES } from '../data/content/company';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const Services: React.FC = () => {
  useEffect(() => {
    updatePageMeta(
      'Our Services — Tourism, Travel & Events — Dinq',
      'Comprehensive ground operations: 16 tourism services, 10 travel logistics solutions, 10 boutique event production capabilities, and 11 international partner models.',
      '/services'
    );
  }, []);

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen">
      {/* Hero */}
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793175061/j3r2rmi9flsvjmoz0jdz.jpg"
        imageAlt="The Simien Mountains, part of Dinq's Ethiopian travel experiences"
        eyebrow="Comprehensive Operations"
        Icon={Briefcase}
        title="Tourism, Travel &"
        titleItalic="Events"
        subtitle="Full-scale professional destination management in Ethiopia. From private VIP leisure itineraries and 4x4 fleet logistics to boutique corporate glamping."
        crumbs={[{ label: 'Services' }]}
        tall={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left">
        {/* Section 1: Tourism Services (16 items) */}
        <section className="mb-16">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <Compass className="h-4 w-4 text-[#D95F49]" />
              <span className="eyebrow">Division 01</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#302019]">
              Tourism & Expedition Services
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#78685E] font-light leading-relaxed">
              Curating authentic, narrative-driven itineraries led by certified historians, ornithologists, and wilderness guides across all Ethiopian regions.
            </p>
          </div>

          <CheckList items={SERVICES_DATA.tourism} columns={2} dark={false} />
        </section>

        {/* Section 2: Travel & Logistics (10 items) */}
        <section className="my-16 rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <Plane className="h-4 w-4 text-[#D95F49]" />
              <span className="eyebrow">Division 02</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#302019]">
              Travel Logistics & Fleet Operations
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#78685E] font-light leading-relaxed">
              Precision ground transportation, flight ticketing, VIP airport protocol, and autonomous expedition-ready 4x4 Land Cruisers with veteran mechanics.
            </p>
          </div>

          <CheckList items={SERVICES_DATA.travel} columns={2} dark={false} />
        </section>

        {/* Section 3: Events & Experiences (10 items) */}
        <section className="my-16">
          <div className="max-w-3xl mb-8 text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="h-4 w-4 text-[#D95F49]" />
              <span className="eyebrow">Division 03</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#302019]">
              Events, Glamping & Brand Activations
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#78685E] font-light leading-relaxed">
              Proprietary production of our signature Urban Camping Ethiopia glamping setups, high-level diplomatic off-sites, and outdoor film location management.
            </p>
          </div>

          <CheckList items={SERVICES_DATA.events} columns={2} dark={false} />
        </section>

        {/* Section 4: International Partnerships (11 Types) on Dark */}
        <section id="partners" className="my-16 rounded-lg bg-[#241C18] text-[#F5E9DA] p-6 sm:p-10 lg:p-12 border border-[#3D3028]">
          <div className="max-w-3xl mb-8 text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <Handshake className="h-4 w-4 text-[#D95F49]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49]">Global Collaboration</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F5E9DA]">
              International Partnerships & DMC Representation
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#F5E9DA]/80 font-light leading-relaxed">
              Dinq acts as the trusted, reliable ground handling operator in Ethiopia for international agencies, film crews, universities, and tour operators worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
            {PARTNERSHIP_TYPES.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3.5 hover:border-[#D95F49]/60 transition-all hover:scale-[1.02]"
              >
                <span className="font-serif text-base font-bold text-[#D95F49]">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-[#F5E9DA] font-medium leading-snug">
                  {partner}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-left">
            <div>
              <p className="font-serif text-xl font-semibold text-[#F5E9DA]">
                Become a Dinq Partner
              </p>
              <p className="text-xs text-[#F5E9DA]/70 mt-1">
                Confidential B2B rate cards, white-label operations, and guaranteed service level agreements.
              </p>
            </div>

            <a
              href={waLink('Hello Dinq! We are an international travel company/organization interested in establishing a B2B DMC partnership in Ethiopia.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terracotta !py-2.5 !px-5 text-xs font-semibold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Partner or Plan with Dinq</span>
            </a>
          </div>
        </section>

        {/* CTABand */}
        <CTABand />
      </div>
    </div>
  );
};