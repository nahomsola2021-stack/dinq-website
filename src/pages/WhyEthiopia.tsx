// src/pages/WhyEthiopia.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Compass,
  Check,
  ArrowRight,
} from 'lucide-react';
import { PageHero } from '../components/premium/PageHero';
import { RouteFlow } from '../components/premium/RouteFlow';
import { PromiseBand } from '../components/premium/PromiseBand';
import { Callout } from '../components/premium/Callout';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import {
  WHY_LEAD_STATEMENT,
  FIVE_VERBS,
  TWELVE_REASONS,
  STOPOVER_CONTENT,
  WHAT_ETHIOPIA_SHOULD_EASE,
  WHAT_DINQ_BRINGS,
} from '../data/content/why';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const WhyEthiopia: React.FC = () => {
  const [activeReasonIndex, setActiveReasonIndex] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    updatePageMeta(
      'Why Ethiopia? 12 Reasons to Visit & Stopover Vision — Dinq',
      'A land of thousands of years of history, living culture, and extraordinary experiences. 12 compelling reasons, plus the Addis Ababa transit stopover guide.',
      '/why-ethiopia'
    );
  }, []);

  // Smooth scroll to hash (#stopover)
  useEffect(() => {
    if (location.hash === '#stopover') {
      const el = document.getElementById('stopover');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  const activeReason = TWELVE_REASONS[activeReasonIndex];

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen">
      {/* Hero */}
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1788196891/x3pjsvkwckin0nkubke3.jpg"
        imageAlt="Lalibela's rock-hewn churches in Ethiopia"
        eyebrow="The Untamed Cradle"
        Icon={Compass}
        title="Why"
        titleItalic="Ethiopia?"
        subtitle={WHY_LEAD_STATEMENT}
        crumbs={[{ label: 'Why Ethiopia' }]}
        tall={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Five Verbs Showcase */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8 text-left">
            <span className="eyebrow">The Five Actions</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#302019]">
              How Ethiopia Changes You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
            {FIVE_VERBS.map((v, i) => (
              <div
                key={i}
                className="rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-5 shadow-xs flex flex-col justify-between hover:border-[#D95F49]/40 transition-colors"
              >
                <div>
                  <span className="font-serif text-2xl font-bold text-[#D95F49]">
                    {v.verb}
                  </span>
                  <p className="mt-2 text-xs text-[#78685E] font-light leading-relaxed">
                    {v.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 12-Reason Explorer (Left List, Right Panel with Fade) */}
        <div className="my-16">
          <div className="mb-8 max-w-2xl text-left animate-fade-in">
            <span className="eyebrow">The 12 Compelling Reasons</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#302019]">
              Twelve Extraordinary Truths
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
            {/* Left selector: scrollable list */}
            <div className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-3 lg:pb-0">
              {TWELVE_REASONS.map((r, idx) => {
                const isSelected = activeReasonIndex === idx;
                return (
                  <button
                    key={r.id}
                    onClick={() => setActiveReasonIndex(idx)}
                    className={`shrink-0 lg:shrink text-left p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#302019] text-[#F5E9DA] border-[#302019] shadow-sm'
                        : 'bg-[#FFF9F2] text-[#78685E] border-[#E7D0B8] hover:border-[#D95F49]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-serif text-base font-bold ${
                          isSelected ? 'text-[#DDAA42]' : 'text-[#D95F49]/80'
                        }`}
                      >
                        {r.numeral}
                      </span>
                      <div>
                        <h4 className="font-serif text-base font-semibold leading-snug">
                          {r.title}
                        </h4>
                        <span
                          className={`text-[11px] block mt-0.5 line-clamp-1 ${
                            isSelected ? 'text-[#F5E9DA]/80' : 'text-[#78685E]'
                          }`}
                        >
                          {r.subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Display Panel with Fade */}
            <div className="lg:col-span-7 rounded-lg overflow-hidden bg-[#FFF9F2] border border-[#E7D0B8] shadow-sm fade-panel">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#241C18]">
                <ImageWithFallback
                  src={activeReason.image}
                  alt={activeReason.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 animate-fade-in" />
                <div className="absolute top-4 left-5 numeral text-white/40 text-2xl font-serif select-none">
                  {activeReason.numeral}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95F49]">
                  {activeReason.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 leading-tight">
                  {activeReason.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#78685E] font-light leading-relaxed">
                  {activeReason.summary}
                </p>

                <div className="mt-5 border-t border-[#E7D0B8]/60 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#302019] block mb-2.5">
                    Historical & Geographic Facts:
                  </span>
                  <div className="space-y-1.5">
                    {activeReason.keyFacts.map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#78685E]">
                        <Check className="h-4 w-4 text-[#D95F49] mt-0.5 shrink-0" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7D0B8]/60 flex items-center justify-between">
                  <span className="text-xs text-[#78685E]">
                    Reason {activeReasonIndex + 1} of 12
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveReasonIndex((prev) => (prev > 0 ? prev - 1 : 11))}
                      className="px-3 py-1.5 rounded border border-[#E7D0B8] text-xs font-semibold hover:bg-[#302019] hover:text-[#F5E9DA] transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveReasonIndex((prev) => (prev < 11 ? prev + 1 : 0))}
                      className="btn-terracotta !py-1.5 !px-3.5 text-xs font-semibold cursor-pointer"
                    >
                      Next Truth
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stopover Section (#stopover) */}
        <section id="stopover" className="my-16 rounded-lg bg-[#241C18] text-[#F5E9DA] p-6 sm:p-10 lg:p-12 border border-[#3D3028] text-left">
          <div className="max-w-3xl mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49]">The Transit Hub Vision</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F5E9DA] mt-1.5">
              Transform Your Layover into an Expedition
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#F5E9DA]/80 font-light leading-relaxed">
              Addis Ababa Bole International Airport is Africa’s premier aviation crossroads. Don't sit in the terminal: step outside into world-class coffee, ancient fossils, and mountain viewpoints with dedicated VIP transit hosts.
            </p>
          </div>

          {/* Stopover Route Sequence */}
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDAA42] block mb-2.5">
              Transit Expedition Flow
            </span>
            <RouteFlow stops={STOPOVER_CONTENT.routeFlow} dark={true} size="md" />
          </div>

          {/* 4 Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
            {STOPOVER_CONTENT.packages.map((pkg, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-white/5 border border-white/10 p-5 flex flex-col justify-between hover:border-[#D95F49]/60 transition-colors hover:scale-[1.02]"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D95F49]">
                    {pkg.hours}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-[#F5E9DA] mt-1">
                    {pkg.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#F5E9DA]/75 font-light leading-relaxed">
                    {pkg.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/10">
                  <a
                    href={waLink(`Hello Dinq! I would like to book the "${pkg.hours}: ${pkg.title}" stopover package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D95F49] hover:text-[#F5E9DA] transition-colors"
                  >
                    <span>Inquire Package</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mandatory Policy Note Callout */}
          <Callout variant="important" title="Transit & Visa Policy Disclaimer" className="my-6 !bg-black/50">
            <p>{STOPOVER_CONTENT.policyNotice}</p>
          </Callout>
        </section>

        {/* What Ethiopia Should Make Easier (5 Cards) */}
        <div className="my-16 text-left">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="eyebrow">Frank Industry Leadership</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#302019]">
              What Ethiopia Should Make Easier
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#78685E] font-light">
              Our honest recommendations for national tourism infrastructure and seamless guest arrivals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {WHAT_ETHIOPIA_SHOULD_EASE.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-base font-bold text-[#DDAA42]">
                    0{idx + 1}
                  </span>
                  <h4 className="font-serif text-base font-semibold text-[#302019] mt-1">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#78685E] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Dinq Brings Chips */}
        <div className="my-16 rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] p-6 sm:p-10 shadow-xs text-left">
          <div className="max-w-2xl mb-6">
            <span className="eyebrow">The Dinq Guarantee</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#302019] mt-1.5">
              What Dinq Brings to Bridge the Gaps
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#78685E] font-light">
              We take care of all friction behind the scenes so you can travel with pure peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {WHAT_DINQ_BRINGS.map((chip, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded bg-[#F5E9DA]/50 border border-[#E7D0B8] hover:scale-[1.02] transition-transform"
              >
                <div className="h-5 w-5 rounded bg-[#D95F49]/15 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-[#D95F49]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#302019]">{chip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Idea Promise Band */}
        <PromiseBand
          image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80"
          line1="Don’t just visit Ethiopia."
          line2ItalicGold="Experience it."
          line3="The journey that stays with you forever."
          spacedWords={['DISCOVER', 'SOVEREIGNTY', 'COFFEE', 'FAITH']}
          brandLine="DINQ TOUR, TRAVEL & EVENTS"
        />

        {/* CTABand */}
        <CTABand />
      </div>
    </div>
  );
};