// src/pages/Mountains.tsx
import React, { useEffect, useState } from 'react';
import { Mountain, ArrowRight, MapPin, Compass, ShieldCheck, X, Check } from 'lucide-react';
import { ItemCard, ItemGrid } from '../components/premium/ItemCard';
import { PromiseBand } from '../components/premium/PromiseBand';
import { Marquee } from '../components/premium/Marquee';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { MOUNTAINS } from '../data/content/wild';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const Mountains: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeModal, setActiveModal] = useState<any | null>(null);

  useEffect(() => {
    updatePageMeta(
      'Mountains & Trekking in Ethiopia — Dinq Tour, Travel & Events',
      '12 premier high-altitude mountain trekking experiences: Simien Massif, Bale Afro-alpine Plateau, Ras Dashen summit (4,550m), Choke water tower, and Zebider Gurage trails.',
      '/mountains'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const mountainNames = [
    'Simien Massif (4,550m)', 'Bale Mountains (4,377m)', 'Ras Dashen Summit',
    'Choke Water Tower (4,070m)', 'Guji Highland Cloud Ridges', 'Mount Gughe (4,200m)',
    'Tulu Dimtu (4,377m)', 'Amba Alagi Fortress (3,949m)', 'Mount Zuqualla Sacred Caldera',
    'Mount Fentale Rift Volcano', 'Zebider Gurage Mountain',
  ];

  const elevenCards = MOUNTAINS.filter((m) => m.id !== 'zebider-mountain');
  const zebider = MOUNTAINS.find((m) => m.id === 'zebider-mountain')!;

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC PARALLAX HERO */}
      <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden bg-[#1A130F]">
        <div 
          className="absolute inset-0 w-full h-full transform scale-105"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <ImageWithFallback
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793175235/crpodr92rcfxr4ahwqyk.jpg"
            alt="Simien Mountains"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#1A130F]/40 to-[#FAF4EB] opacity-95 pointer-events-none" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#DDAA42]/40 text-[9px] font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-8 shadow-xl">
            <Mountain className="w-3.5 h-3.5" /> Afro-Alpine Precipices
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[90px] font-medium tracking-tighter text-[#302019] drop-shadow-sm leading-[0.9]">
            Mountain <span className="italic text-[#D95F49]">Experiences</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#302019] font-medium max-w-2xl drop-shadow-md">
            The Roof of Africa. Towering basalt escarpments, glacial tarns, and trails walked by highland shepherds for thousands of years.
          </p>
        </div>
      </section>

      {/* 2. INFINITE METALLIC MARQUEE */}
      <Marquee items={mountainNames} speed="slow" dark={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-left">
        
        {/* 3. MINIMALIST INTRO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#302019] leading-[1.1] max-w-xl">
            From Volcanic Craters <br />
            <span className="italic text-[#D95F49]">to 4,500m Summits</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-[#78685E] font-light max-w-md md:text-right leading-[1.8]">
            Ethiopia holds the most extensive high-altitude mountain system in Africa. Expeditions are led by certified alpine guides and our outdoor arm, Blue Nile Hiking.
          </p>
        </div>

        {/* 4. ELEGANT 11-CARD GRID */}
        <section className="mb-32">
          <ItemGrid columns={3}>
            {elevenCards.map((mtn) => (
              <button
                key={mtn.id}
                type="button"
                onClick={() => setActiveModal(mtn)}
                className="group h-full text-left appearance-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DDAA42] rounded-[32px] transition-transform duration-500 hover:-translate-y-2 cursor-pointer block w-full"
              >
                <div className="pointer-events-none h-full">
                  <ItemCard
                    numeral={mtn.numeral}
                    name={mtn.name}
                    kicker={mtn.kicker}
                    summary={mtn.summary}
                    italicNote={mtn.italicNote}
                    tags={mtn.tags}
                    signature={mtn.signature}
                    image={mtn.image}
                    badge={mtn.elevation}
                    metaInfo={`${mtn.region} · ${mtn.difficulty}`}
                  />
                </div>
              </button>
            ))}
          </ItemGrid>
        </section>
      </div>

      {/* 5. BESPOKE FEATURE SPREAD: ZEBIDER GURAGE HIGHLANDS */}
      <section className="relative w-full bg-[#120D0A] text-[#FFF9F2] py-28 md:py-40 overflow-hidden text-left shadow-2xl">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
            alt={zebider.name}
            className="w-full h-full object-cover opacity-35 grayscale-[30%] transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120D0A] via-[#120D0A]/90 to-black/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#DDAA42]/30 text-[9px] font-bold tracking-[0.2em] uppercase text-[#DDAA42] backdrop-blur-sm shadow-xl">
                <Mountain className="w-3.5 h-3.5" /> Signature Community Trek
              </span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[80px] font-medium tracking-tight mb-8 leading-[0.95]">
              {zebider.name}
            </h2>
            <p className="text-[#D0C2B6] font-light leading-relaxed text-sm sm:text-base max-w-lg mb-10">
              {zebider.summary}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A]">
              <span className="flex items-center gap-2.5 text-[#F5E9DA] bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                <MapPin className="w-4 h-4 text-[#DDAA42]" /> Gurage Zone
              </span>
              <span className="flex items-center gap-2.5 text-[#F5E9DA] bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                <Compass className="w-4 h-4 text-[#DDAA42]" /> 3,200m Elevation
              </span>
            </div>

            <a
              href={waLink('Hello Dinq! I would like to inquire about the Zebider Mountain & Gurage Villages 15-item curated programme.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-full bg-[#D95F49] hover:bg-[#C04C37] text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_12px_24px_rgba(217,95,73,0.3)] hover:-translate-y-1"
            >
              Book Zebider Trek <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-[3rem] p-10 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DDAA42]/10 blur-2xl rounded-full" />
              
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] mb-8 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" /> Curated Programme Highlights
              </h4>
              <ul className="space-y-6">
                {zebider.programmeItems?.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-[15px] text-[#F5E9DA]/90 font-light leading-snug">
                    <span className="text-[#DDAA42] mt-1 text-[10px]">■</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="font-serif italic text-lg text-[#D0C2B6] leading-relaxed">
                  "{zebider.signature}"
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PROMISE & FOOTER */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
          line1="Walk the mountains."
          line2ItalicGold="Follow the trails."
          line3="Stand above the clouds."
          spacedWords={['ALTITUDE', 'SILENCE', 'ESCARPMENT', 'SANCTUARY']}
          brandLine="BLUE NILE HIKING & DINQ EXPEDITIONS"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <ExploreMore currentId="mountains" />
          <div className="mt-16">
            <CTABand />
          </div>
        </div>
      </div>

      {/* 7. QUICK VIEW MODAL */}
      {activeModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A130F]/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div className="relative w-full max-w-2xl rounded-[2rem] bg-[#FFF9F2] p-6 sm:p-8 md:p-10 text-[#302019] shadow-2xl border border-[#E7D0B8] my-auto animate-in fade-in zoom-in-95 duration-300">
            <button 
              type="button" 
              onClick={() => setActiveModal(null)} 
              className="absolute top-6 right-6 h-10 w-10 rounded-full bg-[#FAF4EB] border border-[#E7D0B8] flex items-center justify-center text-[#78685E] hover:text-[#302019] hover:bg-[#E7D0B8]/50 transition-all z-10 cursor-pointer shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DDAA42]"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-[#1A130F]">
              <ImageWithFallback 
                src={activeModal.image} 
                alt={activeModal.name} 
                className="h-full w-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#FFF9F2]/95 text-[#302019] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm border border-[#E7D0B8] shadow-md">
                {activeModal.kicker || 'Mountain Trek'}
              </div>
              <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] drop-shadow-md">
                  {activeModal.region}
                </span>
                <span className="text-sm font-semibold bg-[#302019]/85 text-[#FFF9F2] px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10 shadow-sm w-fit">
                  {activeModal.elevation}
                </span>
              </div>
            </div>
            
            <div className="pr-12">
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#302019] leading-tight">
                {activeModal.name}
              </h3>
              <p className="text-[11px] text-[#78685E] mt-3 flex items-center gap-1.5 uppercase tracking-[0.2em] font-bold">
                <Compass className="h-4 w-4 text-[#D95F49]" />
                <span>Difficulty: {activeModal.difficulty}</span>
              </p>
            </div>
            
            <p className="mt-6 text-sm sm:text-[15px] text-[#78685E] font-light leading-relaxed">
              {activeModal.summary}
            </p>
            
            {activeModal.programmeItems && activeModal.programmeItems.length > 0 && (
              <div className="mt-8 border-t border-[#E7D0B8] pt-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#302019] mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#DDAA42]" /> Trek Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {activeModal.programmeItems.map((h: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#78685E] leading-relaxed">
                      <Check className="h-4 w-4 text-[#D95F49] mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeModal.signature && (
              <p className="mt-8 border-l-2 border-[#DDAA42] pl-4 font-serif italic text-[#78685E] text-[15px] leading-relaxed">
                "{activeModal.signature}"
              </p>
            )}
            
            <div className="mt-8 pt-6 border-t border-[#E7D0B8] flex justify-end">
              <a 
                href={waLink(`Hello Dinq! I am reaching out to inquire about the ${activeModal.name} trek.`)}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D95F49] hover:bg-[#C04C37] text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-[0_8px_20px_rgba(217,95,73,0.25)] hover:shadow-[0_12px_24px_rgba(217,95,73,0.35)] hover:-translate-y-0.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95F49]"
              >
                Inquire via WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};