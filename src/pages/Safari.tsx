// src/pages/Safari.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, ArrowRight, Clock, ShieldAlert, ArrowUpRight, Leaf } from 'lucide-react';
import { PromiseBand } from '../components/premium/PromiseBand';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { SAFARIS, SAFARI_TYPES } from '../data/content/wild';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const Safari: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    updatePageMeta(
      'Dinq Ethiopia Safari Collection — Wildlife, Wilderness & Rare Habitats',
      'Discover 9 premier Ethiopian safaris: Omo Valley, Gambella migration, Chebera-Churchura forest elephants, Kafta-Shiraro, Aladeghi, and the Afar desert.',
      '/safari'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const safariCards = SAFARIS.filter((s) => s.id !== 'ethiopia-grand-safari');
  const grandSafari = SAFARIS.find((s) => s.id === 'ethiopia-grand-safari')!;

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. ULTRA-MINIMAL CINEMATIC HERO */}
      <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden bg-[#1A130F]">
        <div 
          className="absolute inset-0 w-full h-full transform scale-105"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <ImageWithFallback
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793563605/gjrtkytrzyvhrqbaceyq.webp"
            alt="Antelope grazing across the open Aladeghi savannah"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A130F]/60 via-transparent to-[#FAF4EB] opacity-95 pointer-events-none" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#DDAA42]/40 text-[9px] font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-8 shadow-xl w-fit">
            <Compass className="w-3.5 h-3.5" /> Wildlife & Wilderness
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[100px] font-medium tracking-tighter text-[#302019] drop-shadow-md leading-[0.9]">
            The Safari <span className="italic text-[#D95F49]">Collection</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-left">
        
        {/* 2. ELEGANT TAXONOMY GRID (Luxury Dark Cards) */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#302019] leading-[1.1] max-w-xl">
              Six Dimensions <br />
              <span className="italic text-[#D95F49]">of the Wild</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[#78685E] font-light max-w-sm md:text-right leading-[1.85]">
              Ethiopia spans six distinct ecological biomes, each requiring specialized expedition tracking and highly customized camp logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SAFARI_TYPES.map((type, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-[2.5rem] bg-[#120D0A] border border-[#DDAA42]/20 p-8 sm:p-10 hover:border-[#DDAA42]/80 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(221,170,66,0.15)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between min-h-[300px]"
              >
                <div className="absolute -right-6 -top-10 font-serif text-[160px] font-bold leading-none text-white/5 group-hover:text-[#DDAA42]/10 transition-colors duration-700 pointer-events-none select-none">
                  0{idx + 1}
                </div>

                <div className="relative z-10 flex items-center justify-between w-full mb-12">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#DDAA42] flex items-center gap-2">
                    <Leaf className="w-3.5 h-3.5" /> Biome 0{idx + 1}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#DDAA42] group-hover:border-[#DDAA42] transition-colors duration-500">
                    <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#120D0A] transition-colors duration-500" />
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-4 group-hover:text-[#DDAA42] transition-colors duration-500 leading-tight">
                    {type.name}
                  </h3>
                  <div className="flex items-start gap-2 text-[#D0C2B6] font-light text-[13px] leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-[#D95F49] shrink-0 mt-1" />
                    <span>{type.desc}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-[#DDAA42] to-[#D95F49] w-0 group-hover:w-full transition-all duration-[800ms] ease-out" />
              </div>
            ))}
          </div>
        </section>

        {/* 3. THE EXPEDITION REGISTRY (High-End Vertical Plaques) */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#302019] shrink-0">
              The Registry
            </h2>
            <div className="h-px flex-1 bg-[#E7D0B8]/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {safariCards.map((safari, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <Link
                  key={safari.id}
                  to={`/tours/${safari.id}`}
                  className={`group block relative ${isEven ? 'md:mt-24' : ''}`}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3rem] bg-[#1A130F] shadow-xl group-hover:shadow-2xl transition-all duration-700">
                    <ImageWithFallback
                      src={safari.image}
                      alt={safari.name}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-white border border-white/20 shadow-sm z-10">
                      {safari.duration}
                    </div>

                    <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end text-white z-10">
                      <div className="transform transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#DDAA42] mb-3 block">
                          {safari.safariType}
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] mb-3 group-hover:text-white">
                          {safari.name}
                        </h3>
                        
                        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:max-h-24 group-hover:opacity-100">
                          <p className="text-sm text-white/85 font-light mt-3 line-clamp-2 leading-relaxed">
                            {safari.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between px-4">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#A6978A] tracking-[0.2em] uppercase flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D95F49]" /> {safari.location}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#DDAA42] uppercase tracking-[0.2em] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      View Expedition <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. EXPEDITION FIELD NOTE */}
        <section className="mb-32">
          <div className="max-w-3xl mx-auto rounded-[2.5rem] bg-white border border-[#E7D0B8]/60 p-10 sm:p-12 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#D95F49]" />
            <ShieldAlert className="w-8 h-8 text-[#D95F49] mx-auto mb-6" strokeWidth={1.5} />
            <h4 className="font-serif text-2xl font-semibold text-[#302019] mb-4">
              Commander's Field Note: Erta Ale & Danakil
            </h4>
            <p className="text-[13px] sm:text-[15px] text-[#78685E] font-light leading-relaxed max-w-2xl mx-auto">
              Erta Ale is a dynamic, active volcanic environment. Security, access routes, and safe approach conditions are subject to immediate change based on geophysics and regional stability. Programs are conducted strictly as <span className="font-semibold text-[#302019]">conditional safety-first expeditions</span>, rather than guaranteed lava-lake viewing experiences.
            </p>
          </div>
        </section>
      </div>

      {/* 5. GRAND SAFARI (The Detailed Cinematic Script) */}
      <section className="relative w-full bg-[#120D0A] text-[#FFF9F2] py-28 md:py-40 overflow-hidden text-left shadow-2xl">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=2400&q=80"
            alt={grandSafari.name}
            className="w-full h-full object-cover opacity-30 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120D0A] via-[#120D0A]/90 to-black/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          <div className="w-full lg:w-1/2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#DDAA42]/30 text-[9px] font-bold tracking-[0.2em] uppercase text-[#DDAA42] mb-8 backdrop-blur-md shadow-lg">
              <Compass className="w-3.5 h-3.5" /> Signature Grand Odyssey
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[80px] font-medium tracking-tight mb-8 leading-[0.95]">
              {grandSafari.name}
            </h2>
            <p className="text-[#D0C2B6] font-light leading-relaxed text-sm sm:text-base max-w-lg mb-10">
              {grandSafari.summary}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A]">
              <span className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md text-[#F5E9DA]">
                <Clock className="w-4 h-4 text-[#DDAA42]" /> 16 Days
              </span>
              <span className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md text-[#F5E9DA]">
                <MapPin className="w-4 h-4 text-[#DDAA42]" /> 7 Ecosystems
              </span>
            </div>

            <a
              href={waLink('Hello Dinq! I am interested in inquiring about the 16-Day Ethiopia Grand Safari Circuit.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-full bg-[#D95F49] hover:bg-[#C04C37] text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_12px_24px_rgba(217,95,73,0.3)] hover:-translate-y-1"
            >
              Inquire on Grand Safari <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Luxury Director's Script Narrative Node */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#1A130F]/80 backdrop-blur-2xl border border-[#DDAA42]/20 rounded-[3rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#DDAA42]/10 blur-3xl rounded-full" />
              
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DDAA42] mb-8">
                The Director's Script
              </h4>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D0C2B6] font-light leading-[1.85] mb-6 text-[13px] sm:text-[15px]">
                  <span className="float-left text-5xl sm:text-6xl font-serif text-[#DDAA42] leading-[0.8] pr-4 pt-1 font-medium">
                    T
                  </span>
                  his is not a conventional safari. It is a sweeping, cross-country cinematic traversal through the most diverse topography on the African continent. Your expedition begins in the cedar-scented air of the highlands, where endemic Ethiopian Wolves stalk through the heather of the Sanetti Plateau, before plunging thousands of meters down into the Great Rift Valley.
                </p>
                <p className="text-[#D0C2B6] font-light leading-[1.85] mb-6 text-[13px] sm:text-[15px]">
                  As our convoy of heavy-duty Land Cruisers pushes further south, the landscape sheds its alpine chill for the equatorial heat of the Omo Basin and the uncharted emerald jungles of Chebera-Churchura. Here, you will track untamed forest elephants and witness the raw, ancient pulse of pastoralist tribes who have lived in harmony with this harsh land for millennia.
                </p>
                <p className="text-[#D0C2B6] font-light leading-[1.85] text-[13px] sm:text-[15px]">
                  Every camp is pitched under a canopy of stars. Every route is meticulously scouted by our veteran naturalists. From the Danakil’s sulfur springs to the Aladeghi plains, this 16-day script is written entirely by the rhythm of the wild.
                </p>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <p className="font-serif italic text-lg text-[#DDAA42]">
                  "{grandSafari.signature}"
                </p>
                <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold hidden sm:block">Unscripted Encounters</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PROMISE & FOOTER ELEMENTS */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1600&q=80"
          line1="Not just a safari."
          line2ItalicGold="A journey into the wild heart of Ethiopia."
          line3="Untouched, authentic, and unforgettable."
          spacedWords={['WILDLIFE', 'TRACKING', 'STEWARDSHIP', 'HONOR']}
          brandLine="DINQ SAFARI COLLECTION — ETHIOPIA"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <ExploreMore currentId="safari" />
          <div className="mt-16">
            <CTABand />
          </div>
        </div>
      </div>
    </div>
  );
};