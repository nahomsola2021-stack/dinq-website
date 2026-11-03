// src/pages/ShewaLandEscape.tsx
import React, { useEffect, useState } from 'react';
import { Trees, ArrowRight, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { ItemCard, ItemGrid } from '../components/premium/ItemCard';
import { JourneyRows } from '../components/premium/JourneyRows';
import { CheckList } from '../components/premium/CheckList';
import { PromiseBand } from '../components/premium/PromiseBand';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import {
  SHEWA_DESTINATIONS,
  SHEWA_JOURNEYS,
  SHEWA_WHY,
  SHEWA_COMMUNITY_EXPERIENCE,
} from '../data/content/culture';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const ShewaLandEscape: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    updatePageMeta(
      'Shewa Land Escape — Royal Heritage, Dramatic Escarpments & Living Culture',
      'Discover 10 royal retreats and 5 signature journeys across Shewa: Ensaro, Menz, Molale, Ankober royal escarpment, and Debre Libanos.',
      '/shewa-land-escape'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedShewaJourneys = SHEWA_JOURNEYS.map((j) => ({
    id: j.id,
    numeral: j.numeral,
    name: j.name,
    tagline: j.routeTitle,
    duration: 'Multi-day Expedition',
    routeStops: j.routeStops,
    themes: j.themes,
    summary: j.summary,
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
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793568153/vqnj5scfimdxw56apj8t.jpg"
            alt="Shewa Escarpment"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A130F]/50 via-transparent to-[#FAF4EB] opacity-95 pointer-events-none" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#DDAA42]/40 text-[9px] font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-8 shadow-xl w-fit">
            <Trees className="w-3.5 h-3.5" /> Highland Crown Escapes
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[90px] font-medium tracking-tighter text-[#302019] drop-shadow-md leading-[0.9]">
            Shewa Land <span className="italic text-[#D95F49]">Escape</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#302019] font-medium max-w-2xl drop-shadow-sm">
            Step beyond the capital into 600 years of imperial history, mist-swathed 400-year-old juniper forests, and emerald volcanic crater waters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-left">
        
        {/* 2. STATEMENT SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#302019] leading-[1.1] max-w-xl">
            The Historical Heart <br />
            <span className="italic text-[#D95F49]">of the Central Plateau</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-[#78685E] font-light max-w-md md:text-right leading-[1.85]">
            Shewa is where ancient Ethiopian monarchs established crown forests, built cliff-hanging monasteries above deep gorges, and defended the realm from high mountain fortresses. Today, it offers extraordinary off-grid wilderness within mere hours of Addis Ababa.
          </p>
        </div>

        {/* 3. 10 DESTINATIONS ELEGANT GRID */}
        <section className="mb-32">
          <ItemGrid columns={2}>
            {SHEWA_DESTINATIONS.map((dest) => (
              <ItemCard
                key={dest.id}
                numeral={dest.numeral}
                name={dest.name}
                kicker={dest.kicker}
                summary={dest.summary}
                italicNote={dest.italicNote}
                tags={dest.tags}
                signature={dest.signature}
                image={dest.image}
                badge={dest.distanceFromAddis || dest.kicker}
              />
            ))}
          </ItemGrid>
        </section>

        {/* 4. BESPOKE FEATURE SPREAD: ROYAL SHEWA HERITAGE TRAIL */}
        <section className="relative w-full bg-white rounded-[3rem] border border-[#E7D0B8]/60 shadow-xl overflow-hidden mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            
            <div className="relative aspect-square lg:aspect-auto lg:h-full">
              <ImageWithFallback
                src="https://res.cloudinary.com/dw1ohipim/image/upload/v1793568153/vqnj5scfimdxw56apj8t.jpg"
                alt="Royal Shewa Heritage Trail"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08]/90 via-[#0E0A08]/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DDAA42] mb-3 block">
                  The Mountain Throne of Kings
                </span>
              </div>
            </div>

            <div className="p-10 sm:p-14 lg:p-20 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-[#D95F49]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49]">
                  Imperial Lineage & Fortresses
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#302019] mb-8 leading-[1.1]">
                Royal Shewa Heritage Trail
              </h2>
              <p className="text-[14px] text-[#78685E] font-light leading-relaxed mb-10">
                Retrace the imperial steps of Emperor Zara Yaqob, King Sahle Selassie, and Emperor Menelik II. From the wind-swept palace ridges of Ankober to the sacred 13th-century cliff monastery of Debre Libanos.
              </p>
              
              <ul className="space-y-5 mb-12">
                {[
                  'Standing on the Ankober palace bluff overlooking the Afar depression',
                  'Encountering tame Gelada baboon troops on the Portuguese Bridge',
                  'Exclusive access to Saint Tekle Haymanot monastic manuscripts',
                  'Overnight stay at the historic stone-built Ankober Palace Lodge'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-sm text-[#302019] font-medium bg-[#FAF4EB]/60 p-4 rounded-xl border border-[#E7D0B8]/40">
                    <ShieldCheck className="text-[#DDAA42] w-5 h-5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2.5 mb-12">
                {['Addis Ababa', 'Debre Libanos', 'Jemma Gorge', 'Ankober'].map((stop, i) => (
                  <span key={i} className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A6978A] bg-[#FAF4EB] px-4 py-2 rounded-full border border-[#E7D0B8]">
                    {stop}
                  </span>
                ))}
              </div>

              <a
                href={waLink('Hello Dinq! I would like to inquire about the Royal Shewa Heritage Trail.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-full bg-[#302019] text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#D95F49] transition-all shadow-[0_12px_24px_rgba(48,32,25,0.2)] hover:-translate-y-1 w-fit"
              >
                Inquire on Trail <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 5. ETHICAL TOURISM CHARTER (Dossier Design) */}
        <section className="mb-32">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#2A1D18] to-[#1C120C] p-10 md:p-20 border border-[#DDAA42]/20 shadow-2xl relative overflow-hidden text-[#FFF9F2]">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#DDAA42]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="grain absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DDAA42] block mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Ethical Tourism Charter
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#FFF9F2] mb-6 leading-tight">
                Travel as a Guest. <br/> Leave as a Friend.
              </h3>
              <p className="text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed max-w-2xl">
                Every Shewa excursion with Dinq is co-designed with local community elders, horse handlers, and household matriarchs to ensure mutual dignity and respect.
              </p>
            </div>

            <div className="relative z-10">
              <CheckList items={SHEWA_COMMUNITY_EXPERIENCE} columns={2} dark={true} />
            </div>
          </div>
        </section>

        {/* 6. JOURNEY ROWS */}
        <section className="mb-32">
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6978A] block mb-3">Curated Itineraries</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#302019]">
              Five Signature Shewa Journeys
            </h2>
          </div>
          <JourneyRows items={formattedShewaJourneys} dark={false} />
        </section>

        {/* 7. THE HIGHLAND ADVANTAGE (Asymmetrical Luxury Grid) */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#302019] leading-[1.1] max-w-xl">
              The Highland <br />
              <span className="italic text-[#D95F49]">Advantage</span>
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#78685E] font-light max-w-sm md:text-right leading-[1.85]">
              Why choose a Shewa Escape for your short-window itinerary?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SHEWA_WHY.map((item: { title: string; desc: string }, idx: number) => (
              <div 
                key={idx} 
                className="group relative rounded-[2rem] bg-white border border-[#E7D0B8]/60 p-10 hover:border-[#DDAA42]/60 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(48,32,25,0.06)] hover:-translate-y-2 overflow-hidden flex flex-col justify-between min-h-[320px]"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#DDAA42]/0 to-transparent group-hover:via-[#DDAA42]/80 transition-all duration-700" />
                
                <span className="font-serif text-[80px] leading-none font-light text-[#DDAA42]/20 block mb-8 group-hover:text-[#DDAA42]/80 transition-colors select-none">
                  0{idx + 1}
                </span>
                
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#302019] mb-4 group-hover:text-[#D95F49] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-[13px] sm:text-sm text-[#78685E] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. PROMISE & FOOTER */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
          line1="Travel as a Guest."
          line2ItalicGold="Leave as a Friend."
          line3="The royal highland awaits your arrival."
          spacedWords={['FOREST', 'CALDERA', 'MONASTERY', 'PEACE']}
          brandLine="DINQ SHEWA LAND ESCAPES"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <ExploreMore currentId="shewa-land-escape" />
          <div className="mt-16"><CTABand /></div>
        </div>
      </div>
    </div>
  );
};