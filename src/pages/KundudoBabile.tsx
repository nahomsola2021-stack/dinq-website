import React, { useEffect, useState } from 'react';
import { Wind, ArrowRight, MapPin, Compass } from 'lucide-react';
import { PromiseBand } from '../components/premium/PromiseBand';
import { RouteFlow } from '../components/premium/RouteFlow';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { KUNDUDO_BABILE_CONTENT } from '../data/content/culture';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const KundudoBabile: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    updatePageMeta(
      'The Kundudo Wild Horse & Babile Elephant Expedition — Dinq',
      'An extraordinary expedition from the feral mountain horses of Mount Kundudo (3,000m) to the isolated desert elephants of Babile Sanctuary and walled Harar.',
      '/kundudo-babile'
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { mountKundudo, babileElephant, signatureRoute, whyDifferentCards } = KUNDUDO_BABILE_CONTENT;

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* CINEMATIC HERO */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-[#120D0A]">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
            alt="High mountain peaks and alpine wilderness"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F5E9DA] opacity-90 pointer-events-none" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 text-center">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#DDAA42] uppercase mb-6 flex justify-center items-center gap-2 drop-shadow-md">
            <Wind className="w-4 h-4" /> Signature Eastern Frontier
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-[#302019] drop-shadow-sm leading-[0.9]">
            The Kundudo <span className="italic text-[#D95F49]">Expedition</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#302019] font-medium max-w-2xl mx-auto drop-shadow-sm">
            From the high wind-swept plateau of Mount Kundudo where Africa’s only feral horses roam, to the relict desert elephant sanctuary of Babile.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        
        {/* BESPOKE FEATURE SPREAD: KUNDUDO */}
        <section className="relative w-full bg-white rounded-[2.5rem] border border-[#E7D0B8]/60 shadow-xl overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-auto lg:h-full">
              <ImageWithFallback src={mountKundudo.image} alt={mountKundudo.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-10 sm:p-14 lg:p-20 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] block mb-4">{mountKundudo.kicker}</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#302019] mb-6 leading-tight">{mountKundudo.title}</h2>
              <p className="text-[14px] text-[#78685E] font-light leading-relaxed mb-8">{mountKundudo.summary}</p>
              <ul className="space-y-4 mb-10">
                {mountKundudo.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#302019] font-medium"><span className="text-[#DDAA42] mt-1 text-[10px]">■</span>{item}</li>
                ))}
              </ul>
              <a href={waLink('Hello Dinq! I would like to inquire about the Mount Kundudo Wild Horse ascent.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#302019] text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#D95F49] transition-all shadow-md w-fit">
                Inquire on Trek
              </a>
            </div>
          </div>
        </section>

        {/* SIGNATURE ROUTE - GLASSMORPHIC STYLE */}
        <section className="mb-24 relative rounded-[2.5rem] bg-gradient-to-br from-[#2A1D18] to-[#1C120C] p-10 md:p-16 border border-[#DDAA42]/20 shadow-2xl overflow-hidden">
          <div className="grain absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] block mb-4">Complete Circuit Itinerary</span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#FFF9F2] mb-6">The 6-Day Eastern Frontier Route</h3>
            <p className="text-sm text-[#D0C2B6] font-light leading-relaxed mb-12 max-w-2xl mx-auto">Linking historic railway heritage in Dire Dawa, the medieval walled city of Harar Jugol, and two rare wildlife ecosystems.</p>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-left">
              <RouteFlow stops={signatureRoute} dark={true} size="md" />
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href={waLink('Hello Dinq! I want to book the 6-Day Kundudo to Babile Signature Route.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#DDAA42] text-[#1C120C] font-bold text-[10px] tracking-widest uppercase hover:bg-[#E7C175] transition-all shadow-[0_0_20px_rgba(221,170,66,0.3)]">
                <span>Book Signature Route</span><ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* BESPOKE FEATURE SPREAD: BABILE */}
        <section className="relative w-full bg-white rounded-[2.5rem] border border-[#E7D0B8]/60 shadow-xl overflow-hidden mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 sm:p-14 lg:p-20 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDAA42] block mb-4">{babileElephant.kicker}</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#302019] mb-6 leading-tight">{babileElephant.title}</h2>
              <p className="text-[14px] text-[#78685E] font-light leading-relaxed mb-8">{babileElephant.summary}</p>
              <ul className="space-y-4 mb-10">
                {babileElephant.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#302019] font-medium"><span className="text-[#D95F49] mt-1 text-[10px]">■</span>{item}</li>
                ))}
              </ul>
              <a href={waLink('Hello Dinq! I would like to inquire about elephant tracking in Babile.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#302019] text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#D95F49] transition-all shadow-md w-fit">
                Inquire on Safari
              </a>
            </div>
            <div className="relative aspect-square lg:aspect-auto lg:h-full order-1 lg:order-2">
              <ImageWithFallback src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80" alt={babileElephant.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* "WHY UNLIKE ANY OTHER" - TAXONOMY GRID STYLE */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#302019] leading-tight max-w-xl">
              The Expedition <br />
              <span className="italic text-[#D95F49]">Difference</span>
            </h2>
            <p className="text-[13px] sm:text-sm text-[#78685E] font-light max-w-sm md:text-right leading-relaxed">
              Why this remote eastern traverse is one of Africa’s best-kept wilderness secrets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whyDifferentCards.map((card, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-[24px] bg-white border border-[#E7D0B8]/60 p-8 hover:border-[#DDAA42]/60 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(48,32,25,0.06)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DDAA42]/0 to-transparent group-hover:via-[#DDAA42]/80 transition-all duration-700" />
                <span className="font-serif text-5xl md:text-6xl font-light text-[#DDAA42]/30 block mb-6 group-hover:text-[#DDAA42]/80 transition-colors">{card.numeral}</span>
                <h4 className="font-serif text-xl font-medium text-[#302019] mb-3 group-hover:text-[#D95F49] transition-colors duration-300">{card.title}</h4>
                <p className="text-xs text-[#78685E] font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PROMISE & FOOTER */}
      <div className="bg-[#FAF4EB]">
        <PromiseBand
          image="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1600&q=80"
          line1="From wild horses to wild elephants."
          line2ItalicGold="From mountain peaks to cultural heartlands."
          line3="From nature to conservation."
          spacedWords={['WILD HORSES', 'MOUNTAINS', 'ELEPHANTS', 'CONSERVATION']}
          brandLine="DISCOVER EASTERN ETHIOPIA WITH DINQ"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ExploreMore currentId="kundudo-babile" />
          <div className="mt-16"><CTABand /></div>
        </div>
      </div>
    </div>
  );
};