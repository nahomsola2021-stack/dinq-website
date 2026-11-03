// src/pages/Birding.tsx
import React, { useEffect, useState } from 'react';
import { Feather, Camera, HeartHandshake, Check } from 'lucide-react';
import { ItemCard, ItemGrid } from '../components/premium/ItemCard';
import { JourneyRows } from '../components/premium/JourneyRows';
import { PromiseBand } from '../components/premium/PromiseBand';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { BIRDING_DESTINATIONS, BIRDING_JOURNEYS } from '../data/content/wild';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const Birding: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

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
      
      {/* CINEMATIC HERO (75vh to enforce epic birding scaling) */}
      <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-[#120D0A]">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <ImageWithFallback
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793565893/r9vdmvpavn1xytdgqwuv.webp"
            alt="Birding in Ethiopia's Bale Mountains"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#F5E9DA] opacity-90 pointer-events-none" />
        
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

        {/* 14 DESTINATION CARDS */}
        <section className="mb-32">
          <ItemGrid columns={3}>
            {BIRDING_DESTINATIONS.map((dest) => (
              <ItemCard
                key={dest.id}
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
    </div>
  );
};