// src/pages/Festivals.tsx
import React, { useEffect, useState } from 'react';
import { Flame, ArrowRight, HeartHandshake } from 'lucide-react';
import { ItemCard, ItemGrid } from '../components/premium/ItemCard';
import { JourneyRows } from '../components/premium/JourneyRows';
import { PromiseBand } from '../components/premium/PromiseBand';
import { RouteFlow } from '../components/premium/RouteFlow';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { FESTIVALS, FESTIVAL_JOURNEYS } from '../data/content/culture';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const Festivals: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    updatePageMeta(
      'Festivals of Faith & Culture — Dinq Tour, Travel & Events',
      'Experience 12 living Ethiopian religious and cultural celebrations: Timkat, Meskel, Genna in Lalibela, Fasika, Irreecha, and Fichee-Chambalaalla.',
      '/festivals'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calendarFlowSteps = [
    'Discover Calendar Timing',
    'Choose Sacred Destination',
    'Build Curated Journey',
    'Experience Living Liturgy',
  ];

  const formattedFestivalJourneys = FESTIVAL_JOURNEYS.map((j) => ({
    id: j.id,
    numeral: j.numeral,
    name: j.name,
    tagline: j.routeTitle,
    duration: 'Multi-day',
    routeStops: j.routeStops,
    themes: j.themes,
    summary: j.summary,
  }));

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC PARALLAX HERO */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-[#120D0A] flex flex-col justify-end">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <ImageWithFallback
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1789847248/gjwftoryuwyhroh0orkr.jpg"
            alt="Ethiopian Timkat Festival"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F5E9DA] opacity-90 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-center">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-6 flex justify-center items-center gap-2 drop-shadow-md">
            <Flame className="w-4 h-4 text-[#D95F49]" /> Living Antiquity
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-[#302019] drop-shadow-sm leading-[0.9]">
            Festivals of <span className="italic text-[#D95F49]">Faith & Culture</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#302019] font-medium max-w-2xl mx-auto drop-shadow-sm">
            Unbroken sacred traditions where thousands gather in immaculate white robes, velvet royal umbrellas, and choral hymns unchanged across sixteen centuries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* 2. FESTIVAL CALENDAR 4-STEP FLOW */}
        <section className="mb-32">
          <div className="rounded-[2.5rem] bg-white border border-[#E7D0B8]/60 p-10 sm:p-14 lg:p-16 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49] block mb-4">
                  Trip Planning Architecture
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#302019]">
                  The Festival Journey Flow
                </h2>
              </div>
              <p className="text-[13px] sm:text-sm text-[#78685E] font-light max-w-sm md:text-right leading-relaxed">
                Ethiopian festivals follow their own ancient solar calendar. Planning an authentic celebration requires exact timing, reserved viewing perimeters, and respectful cultural orientation.
              </p>
            </div>

            <div className="bg-[#FAF4EB] rounded-2xl p-8 border border-[#E7D0B8]/50 mb-16">
              <RouteFlow stops={calendarFlowSteps} dark={false} size="md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              {[
                { title: 'Timing Verification', desc: 'Ethiopian festival dates shift during leap years. We verify exact liturgical schedules with the Patriarchate and regional councils.' },
                { title: 'Reserved Vantage', desc: 'Dinq reserves private viewing terraces and seating enclosures at Fasilides’ Bath (Gondar) and Meskel Square (Addis Ababa).' },
                { title: 'Cultural Netela Attire', desc: 'Guests receive hand-woven white cotton Netela shawls and respectful etiquette briefings before entering sacred ceremonial spaces.' },
                { title: 'Post-Festival Circuits', desc: 'Seamlessly extend your festival journey into nearby mountain treks, crater lake retreats, or wildlife safaris.' },
              ].map((step, idx) => (
                <div key={idx} className="relative pt-6 border-t border-[#E7D0B8] group hover:border-[#DDAA42] transition-colors">
                  <span className="font-mono text-[10px] font-bold text-[#DDAA42] tracking-widest block mb-3">0{idx + 1}</span>
                  <h4 className="font-serif text-xl font-medium text-[#302019] mb-3 group-hover:text-[#D95F49] transition-colors">{step.title}</h4>
                  <p className="text-[13px] text-[#78685E] font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 12 FESTIVAL CARDS GRID */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-4 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#302019] shrink-0">
              Twelve Sacred Celebrations
            </h2>
            <div className="h-px flex-1 bg-[#E7D0B8]" />
          </div>

          <ItemGrid columns={3}>
            {FESTIVALS.map((fest) => (
              <ItemCard
                key={fest.id}
                numeral={fest.numeral}
                name={fest.name}
                kicker={fest.kicker}
                summary={fest.summary}
                italicNote={fest.italicNote}
                tags={fest.experiencePoints}
                signature={fest.signatureJourney || fest.name}
                image={fest.image}
                badge={fest.signatureJourney ? 'Signature Journey' : undefined}
              />
            ))}
          </ItemGrid>
        </section>

        {/* 4. CURATED FESTIVAL ROUTES */}
        <section className="mb-32">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6978A] block mb-3">Curated Festival Routes</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#302019]">
              Four Signature Festival Journeys
            </h2>
            <p className="mt-3 text-sm text-[#78685E] font-light">
              Carefully scheduled multi-day itineraries built around festival culmination dates.
            </p>
          </div>

          <JourneyRows items={formattedFestivalJourneys} dark={false} />
        </section>

        {/* 5. THE DINQ PHILOSOPHY - DRAMATIC DARK CARD */}
        <section className="mb-24">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#2A1D18] to-[#1C120C] p-10 md:p-16 border border-[#DDAA42]/20 shadow-2xl relative overflow-hidden text-[#FFF9F2] flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#DDAA42]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            {/* Massive Icon */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
              <div className="text-[#DDAA42] p-8 rounded-full border border-[#DDAA42]/20 bg-[#120D0A] shadow-[0_0_40px_rgba(221,170,66,0.15)]">
                <HeartHandshake className="w-24 h-24 sm:w-32 sm:h-32" strokeWidth={1} />
              </div>
            </div>

            <div className="w-full md:w-2/3 relative z-10 text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49] block mb-4">
                The Dinq Philosophy
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-medium text-[#FFF9F2] mb-6">
                Festival Tourism with Honor & Dignity
              </h3>
              <p className="text-[15px] text-[#D0C2B6] font-light leading-relaxed mb-10">
                We never treat sacred liturgies as tourist spectacles. Our guests travel as reverent observers, welcomed with warm Ethiopian hospitality and guided by knowledgeable hosts who explain the centuries of symbolism, scripture, and music behind every ceremony.
              </p>

              <a
                href={waLink('Hello Dinq! I would like to reserve a place for an upcoming festival journey.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#DDAA42] hover:bg-[#E7C175] text-[#1C120C] font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(221,170,66,0.3)] hover:scale-105"
              >
                Inquire on Festival Departures <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 6. PROMISE & FOOTER */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1600&q=80"
          line1="Come for the festival."
          line2ItalicGold="Discover the culture. Meet the people."
          line3="Leave with the story."
          spacedWords={['FAITH', 'LITURGY', 'CHANT', 'COMMUNITY']}
          brandLine="DINQ FESTIVALS OF ETHIOPIA"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <ExploreMore currentId="festivals" />
          <div className="mt-16"><CTABand /></div>
        </div>
      </div>
    </div>
  );
};