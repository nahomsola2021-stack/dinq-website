// src/pages/SignatureRoutes.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, ArrowUpRight } from 'lucide-react';
import { JourneyRows } from '../components/premium/JourneyRows';
import { PromiseBand } from '../components/premium/PromiseBand';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { FIVE_WAYS, NATIONAL_ROUTES } from '../data/content/journeys';
import { updatePageMeta } from '../lib/seo';

export const SignatureRoutes: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    updatePageMeta(
      'Signature Routes of Ethiopia — Five Ways & Seven National Circuits',
      'Traverse Ethiopia across Five Gateways and 7 national circuits: Historic North, Great Rift Valley, Coffee Origins, Wildlife Odyssey, and South Omo.',
      '/signature-routes'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedNationalRoutes = NATIONAL_ROUTES.map((r) => ({
    id: r.id,
    numeral: r.numeral,
    name: r.name,
    tagline: r.tagline,
    duration: r.duration,
    routeStops: r.routeStops,
    themes: r.themes,
    summary: r.summary,
  }));

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC PARALLAX HERO */}
      <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden bg-[#1A130F]">
        <div 
          className="absolute inset-0 w-full h-full transform scale-105"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <ImageWithFallback
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793565956/nljiyy4bi57bajr9hamm.jpg"
            alt="Gelada baboon overlooking the Simien Mountains"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A130F]/40 via-transparent to-[#FAF4EB] opacity-95 pointer-events-none" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-left">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#DDAA42]/40 text-[9px] font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-8 shadow-xl w-fit">
            <Compass className="w-3.5 h-3.5" /> National Traversals
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[90px] font-medium tracking-tighter text-[#302019] drop-shadow-md leading-[0.9]">
            Explore Ethiopia <span className="italic text-[#D95F49]">with Dinq</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#302019] font-medium max-w-2xl drop-shadow-sm">
            Five cardinal ways to uncover the soul of the country, and seven comprehensive national circuit expeditions designed for deep immersion.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-left">
        
        {/* 2. THE FIVE GATEWAYS - LUXURY OFFSET EDITORIAL LAYOUT */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#302019] leading-[1.1] max-w-2xl">
              Five Gateways <br />
              <span className="italic text-[#D95F49]">to the Heart of the Horn</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[#78685E] font-light max-w-md md:text-right leading-[1.85]">
              Each region of Ethiopia possesses its own unique topography, architecture, language, and spiritual heritage. Choose your cardinal axis of discovery.
            </p>
          </div>

          <div className="space-y-32 sm:space-y-40">
            {FIVE_WAYS.map((way, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div key={way.id} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Block */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-[#1A130F] shadow-[0_20px_50px_rgba(48,32,25,0.15)]">
                      <ImageWithFallback
                        src={way.image}
                        alt={way.name}
                        className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08]/90 via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute top-8 left-10 font-serif text-[100px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] select-none drop-shadow-2xl">
                        0{idx + 1}
                      </div>
                      
                      <div className="absolute bottom-8 left-10 right-10">
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#DDAA42] bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
                          {way.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Block */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px w-8 bg-[#D95F49]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49]">
                        {way.verb}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#302019] leading-[1.1] mb-8">
                      {way.name}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#78685E] font-light leading-[1.85] mb-10">
                      {way.summary}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                      {way.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold tracking-[0.15em] uppercase bg-[#FAF4EB]/50 border border-[#E7D0B8]/80 text-[#A6978A] px-4 py-2 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={way.routeSlug}
                      className="inline-flex items-center gap-2.5 px-8 py-4.5 rounded-full bg-[#302019] text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#D95F49] transition-all shadow-[0_12px_24px_rgba(48,32,25,0.15)] hover:-translate-y-1 w-fit group"
                    >
                      <span>Explore {way.name}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. NATIONAL CIRCUIT ODYSSEY (Dark Glassmorphic JourneyRows Container) */}
        <section className="mb-32">
          <div className="rounded-[3rem] bg-[#120D0A] text-[#FFF9F2] p-10 sm:p-14 lg:p-20 border border-[#3D3028] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80')] bg-cover bg-fixed bg-center opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#DDAA42]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10 mb-16 max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DDAA42] block mb-5 flex items-center gap-2">
                <Compass className="w-4 h-4" /> National Circuit Odyssey
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FFF9F2] mb-8 leading-[1.1]">
                Seven Comprehensive <br />
                <span className="italic text-[#DDAA42]">National Routes</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed max-w-2xl">
                Meticulously engineered cross-country itineraries balancing comfortable drive times, scenic mountain passes, and immersive local stays.
              </p>
            </div>

            <div className="relative z-10">
              <JourneyRows items={formattedNationalRoutes} dark={true} />
            </div>
          </div>
        </section>
      </div>

      {/* 4. PROMISE & FOOTER */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80"
          line1="One Country."
          line2ItalicGold="Many Worlds."
          line3="One Extraordinary Journey."
          spacedWords={['HISTORY', 'CULTURE', 'WILDLIFE', 'ORIGIN']}
          brandLine="DINQ SIGNATURE NATIONAL ROUTES"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <ExploreMore />
          <div className="mt-16"><CTABand /></div>
        </div>
      </div>
    </div>
  );
};