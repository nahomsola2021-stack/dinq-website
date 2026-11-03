// src/pages/Birding.tsx
import React, { useEffect, useState } from 'react';
import {
  Feather,
  Camera,
  HeartHandshake,
  Check,
  X,
  MapPin,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { ItemCard, ItemGrid } from '../components/premium/ItemCard';
import { JourneyRows } from '../components/premium/JourneyRows';
import { PromiseBand } from '../components/premium/PromiseBand';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { BIRDING_DESTINATIONS, BIRDING_JOURNEYS } from '../data/content/wild';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';
import { useBooking } from '../context/BookingContext';

type BirdingDestination = (typeof BIRDING_DESTINATIONS)[number];

export const Birding: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedHabitat, setSelectedHabitat] = useState<BirdingDestination | null>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    updatePageMeta(
      'Ethiopia Birding Expeditions — 14 IBAs & 5 Curated Journeys',
      'Over 850 bird species and 30+ endemics. Specialized ornithology expeditions to Awash, Bale cloud forests, Liben plains, and Great Rift Valley lakes.',
      '/birding'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close pop-up on Escape key and lock background scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedHabitat(null);
    };

    if (selectedHabitat) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedHabitat]);

  const formattedJourneys = BIRDING_JOURNEYS.map((j) => ({
    id: j.id,
    numeral: j.numeral,
    name: j.name,
    tagline: j.routeTitle,
    duration: j.duration || 'Multi-day',
    routeStops: j.routeStops,
    themes: j.themes,
    summary: j.summary,
  }));

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      {/* Scoped Brightness Boost for Original ItemCards */}
      <style>{`
        .bird-bright-cards img {
          filter: brightness(1.22) contrast(1.06) saturate(1.12);
          opacity: 1 !important;
          transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 500ms ease;
        }
        .bird-bright-cards > div:hover img {
          filter: brightness(1.3) contrast(1.08) saturate(1.16);
        }
      `}</style>

      {/* CINEMATIC HERO (75vh to enforce epic birding scaling) */}
      <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-[#120D0A]">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <ImageWithFallback
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793565893/r9vdmvpavn1xytdgqwuv.webp"
            alt="Birding in Ethiopia's Bale Mountains"
            className="w-full h-full object-cover opacity-95 brightness-115 contrast-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F5E9DA] opacity-90 pointer-events-none" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-6 flex justify-center md:justify-start items-center gap-2 drop-shadow-md">
            <Feather className="w-4 h-4 text-[#D95F49]" /> Avian Crossroads of Africa
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-[#302019] drop-shadow-sm leading-[0.9]">
            Ethiopia <span className="italic text-[#D95F49]">Birding</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#302019] font-medium max-w-xl drop-shadow-sm mx-auto md:mx-0">
            Home to more than 850 recorded species and 30+ endemics found nowhere else. From Prince Ruspoli’s Turaco to the high-flying Lammergeier.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* INTRO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#302019] leading-[1.1] max-w-lg">
            14 Prime Avian <br />
            <span className="italic text-[#D95F49]">Habitats & IBAs</span>
          </h2>
          <p className="text-[13px] sm:text-sm text-[#5B4F46] font-light max-w-sm md:text-right leading-relaxed">
            Our birding departures are guided by veteran Ethiopian ornithologists equipped with digital sound libraries, Swarovski optics, and intimate knowledge of micro-territories.
          </p>
        </div>

        {/* 14 DESTINATION CARDS (Original ItemCard Design + Increased Brightness + Click Pop-Up) */}
        <section className="mb-32 bird-bright-cards">
          <ItemGrid columns={3}>
            {BIRDING_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedHabitat(dest)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedHabitat(dest);
                  }
                }}
                aria-label={`View details for ${dest.name}`}
                className="cursor-pointer h-full flex flex-col [&>*]:flex-1 focus:outline-none focus:ring-2 focus:ring-[#D95F49] rounded-3xl"
              >
                <ItemCard
                  numeral={dest.numeral}
                  name={dest.name}
                  kicker={dest.kicker}
                  summary={dest.summary}
                  italicNote={dest.italicNote}
                  tags={dest.experiencePoints || []}
                  signature={dest.ibaNote || 'Important Bird Area'}
                  image={dest.image}
                  badge={dest.isIBA ? 'Important Bird Area (IBA)' : undefined}
                  metaInfo={dest.kicker}
                />
              </div>
            ))}
          </ItemGrid>
        </section>

        {/* TWO-UP EDITORIAL SPREAD */}
        <section className="mb-32 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="group rounded-[2.5rem] bg-white border border-[#E7D0B8]/60 p-10 md:p-14 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D95F49]/5 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-10 text-[#D95F49] group-hover:scale-110 transition-transform duration-700 origin-left">
                    <Camera className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A] block mb-3">Specialist Optics</span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#302019] mb-4">Birding & <span className="italic text-[#DDAA42]">Photography</span></h3>
                  <p className="text-sm text-[#5B4F46] font-light leading-relaxed mb-8">Patience, dawn vehicle positioning, and quiet approach techniques ensure composition mapping of shy forest turacos, raptors in mid-flight, and dense waterbird colonies.</p>
                  <ul className="space-y-4 text-[13px] text-[#5B4F46] font-light mb-12">
                    <li className="flex items-start gap-3"><Check className="h-4 w-4 text-[#D95F49] shrink-0 mt-0.5" />Early dawn access to private lakeside and wetland hides</li>
                    <li className="flex items-start gap-3"><Check className="h-4 w-4 text-[#D95F49] shrink-0 mt-0.5" />Beanbags and Gimbal-head window mounts in 4x4 vehicles</li>
                    <li className="flex items-start gap-3"><Check className="h-4 w-4 text-[#D95F49] shrink-0 mt-0.5" />Dedicated charging banks for camera battery packs</li>
                  </ul>
                </div>
                <a href={waLink('Hello Dinq! I would like to inquire about birding photography expeditions.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FAF4EB] border border-[#E7D0B8] text-[#302019] font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#D95F49] hover:text-white hover:border-[#D95F49] transition-all w-fit cursor-pointer">
                  Consult Photo Guide
                </a>
              </div>
            </div>

            <div className="group rounded-[2.5rem] bg-gradient-to-br from-[#2A1D18] to-[#1C120C] border border-[#DDAA42]/20 p-10 md:p-14 shadow-xl hover:shadow-[0_20px_40px_rgba(221,170,66,0.15)] transition-all duration-500 overflow-hidden relative text-[#FFF9F2]">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#DDAA42]/10 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-10 text-[#DDAA42] group-hover:scale-110 transition-transform duration-700 origin-left">
                    <HeartHandshake className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] block mb-3">Habitat Stewardship</span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#FFF9F2] mb-4">Birding & <span className="italic text-[#D95F49]">Conservation</span></h3>
                  <p className="text-sm text-[#D0C2B6] font-light leading-relaxed mb-8">Every birding journey with Dinq directly finances community scout wages in critically endangered habitats, such as the Liben Plains (saving the Liben Lark) and the juniper groves of Bale.</p>
                  <ul className="space-y-4 text-[13px] text-[#A6978A] font-light mb-12">
                    <li className="flex items-start gap-3"><span className="text-[#DDAA42] mt-1 text-[10px] mr-1">■</span>Direct conservation gate fees to Ethiopian Wildlife Conservation Authority</li>
                    <li className="flex items-start gap-3"><span className="text-[#DDAA42] mt-1 text-[10px] mr-1">■</span>Employment of indigenous pastoralist scouts as tracking escorts</li>
                    <li className="flex items-start gap-3"><span className="text-[#DDAA42] mt-1 text-[10px] mr-1">■</span>Citizen science contribution to global eBird and avibase databases</li>
                  </ul>
                </div>
                <a href={waLink('Hello Dinq! Tell me more about community conservation in birding.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#DDAA42] text-[#1C120C] font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#E7C175] transition-all shadow-[0_0_15px_rgba(221,170,66,0.4)] w-fit cursor-pointer">
                  Support Conservation
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* JOURNEY ROWS */}
        <section className="mb-24 text-left">
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6978A] block mb-3">Specialist Itineraries</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#302019]">
              Curated Birding Journeys
            </h2>
          </div>
          <JourneyRows items={formattedJourneys} dark={false} />
        </section>
      </div>

      {/* PROMISE & FOOTER */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
          line1="Wake before the world."
          line2ItalicGold="Walk into the wild."
          line3="The avian marvel of Africa awaits."
          spacedWords={['SPECIES', 'ENDEMICS', 'CANOPY', 'WINGS']}
          brandLine="DINQ ETHIOPIA BIRDING EXPEDITIONS"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <ExploreMore currentId="birding" />
          <div className="mt-16">
            <CTABand />
          </div>
        </div>
      </div>

      {/* =================================================================
          POP-UP HABITAT & SPECIES DOSSIER MODAL
      ================================================================= */}
      {selectedHabitat && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="birding-modal-title"
          onClick={() => setSelectedHabitat(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-[2.25rem] bg-[#FFF9F2] border border-[#E7D0B8] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-8 text-left"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedHabitat(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/95 border border-[#E7D0B8] flex items-center justify-center text-[#302019] hover:bg-[#302019] hover:text-white transition-colors cursor-pointer shadow-md"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: High-Brightness Bird Image Showcase */}
            <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] lg:min-h-full bg-[#1A130F] overflow-hidden flex flex-col justify-between p-6">
              <ImageWithFallback
                src={selectedHabitat.image}
                alt={selectedHabitat.name}
                className="absolute inset-0 w-full h-full object-cover brightness-[1.2] contrast-[1.06] saturate-[1.12]"
              />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="font-serif text-4xl font-medium text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {selectedHabitat.numeral}
                </span>
                {selectedHabitat.isIBA && (
                  <span className="bg-[#DDAA42] text-[#1A130F] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                    Important Bird Area (IBA)
                  </span>
                )}
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 mt-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#DDAA42] text-[10px] font-bold uppercase tracking-widest mb-2">
                  <Feather className="h-3 w-3" />
                  <span>{selectedHabitat.ibaNote || 'Important Bird Area'}</span>
                </div>
                {selectedHabitat.italicNote && (
                  <p className="font-serif italic text-sm sm:text-base text-white drop-shadow">
                    “{selectedHabitat.italicNote}”
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Detailed Ornithological Dossier */}
            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49] mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{selectedHabitat.kicker}</span>
                </div>

                <h3
                  id="birding-modal-title"
                  className="font-serif text-3xl sm:text-4xl font-semibold text-[#302019] leading-tight"
                >
                  {selectedHabitat.name}
                </h3>

                <p className="mt-4 text-sm text-[#5B4F46] font-light leading-relaxed">
                  {selectedHabitat.summary}
                </p>

                {/* Key Target Species & Highlights */}
                {selectedHabitat.experiencePoints && selectedHabitat.experiencePoints.length > 0 && (
                  <div className="mt-7 pt-6 border-t border-[#E7D0B8]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#302019] block mb-3.5">
                      Key Target Species & Habitat Highlights
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedHabitat.experiencePoints.map((point: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF4EB] border border-[#E7D0B8]/80 text-xs font-medium text-[#302019]"
                        >
                          <Check className="h-4 w-4 text-[#D95F49] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Field Support Box */}
                <div className="mt-6 p-4 rounded-2xl bg-[#1A130F] text-[#FFF9F2] border border-[#DDAA42]/30 flex items-start gap-3.5">
                  <Sparkles className="h-5 w-5 text-[#DDAA42] shrink-0 mt-0.5" />
                  <div className="text-xs font-light text-[#D0C2B6] leading-relaxed">
                    <strong className="text-[#DDAA42] font-semibold block mb-0.5">
                      Dinq Ornithology Field Standard
                    </strong>
                    Includes senior Ethiopian birding guide, custom 4x4 window beanbag mounts, dawn hide positioning, and daily eBird checklist logging.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-5 border-t border-[#E7D0B8] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const habitatName = selectedHabitat.name;
                    setSelectedHabitat(null);
                    openBooking(`Birding Expedition: ${habitatName}`);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#302019] hover:bg-[#D95F49] text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer shadow-lg text-center"
                >
                  Book This Birding Habitat
                </button>
                <a
                  href={waLink(
                    `Hello Dinq Birding Team! I would like to inquire about a birding expedition to ${selectedHabitat.name} (${selectedHabitat.kicker}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-full bg-[#FAF4EB] hover:bg-[#DDAA42] text-[#302019] border border-[#E7D0B8] text-[11px] font-bold uppercase tracking-[0.15em] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4 text-[#D95F49]" />
                  <span>Ask Ornithologist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Birding;