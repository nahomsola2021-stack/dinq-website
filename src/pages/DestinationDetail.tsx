// src/pages/DestinationDetail.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Compass, 
  ArrowUpRight, 
  Quote,
  CheckCircle2,
  Share2,
  Compass as CompassIcon,
  Globe,
  Sun,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { ExperienceGrid } from '../components/tours/ExperienceCard';
import { CTABand } from '../components/premium/CTABand';
import { DESTINATIONS_DATA } from '../data/content/destinations';
import { TOURS_DATA } from '../data/content/tours';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

export const DestinationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // robust match to bypass any TS type difference or case mismatch (e.g., id vs. slug)
  const destination = useMemo(() => {
    if (!slug) return null;
    return DESTINATIONS_DATA.find(
      (d) => 
        d.id?.toLowerCase() === slug.toLowerCase() || 
        (d as any).slug?.toLowerCase() === slug.toLowerCase()
    );
  }, [slug]);

  // Dynamically filter actual related live tours targeting this region
  const relatedTours = useMemo(() => {
    if (!destination) return [];
    return TOURS_DATA.filter((t) => 
      t.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
      t.summary.toLowerCase().includes(destination.name.toLowerCase()) ||
      (t as any).routeStops?.some((stop: string) => stop.toLowerCase().includes(destination.name.toLowerCase()))
    ).slice(0, 3);
  }, [destination]);

  // Track parallax offsets safely
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (destination) {
      updatePageMeta(
        `${destination.name} Expeditions — Dinq Tour, Travel & Events`,
        destination.summary.substring(0, 150) + '...',
        `/destinations/${destination.id}`
      );
    }
  }, [destination]);

  // High-End Error Fallback if ID/Slug mismatch occurs
  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF4EB] text-[#302019] px-4">
        <div className="p-8 max-w-md bg-white rounded-3xl border border-[#E7D0B8]/60 shadow-xl text-center space-y-6">
          <CompassIcon className="h-16 w-16 text-[#D95F49] mx-auto animate-spin" strokeWidth={1} />
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#302019]">Expedition Lost?</h2>
          <p className="text-sm text-[#78685E] font-light leading-relaxed">
            The destination you are looking for does not exist in our regional database, or is currently undergoing map adjustments.
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={() => navigate('/destinations')} 
              className="w-full py-4 rounded-full bg-[#302019] hover:bg-[#D95F49] text-white font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
            >
              Back to Regions & Atlas
            </button>
            <Link 
              to="/tours" 
              className="text-xs font-bold uppercase tracking-widest text-[#D95F49] hover:underline"
            >
              Explore Alternative Routes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const highlights = destination.highlights || [
    'Explore ancient historical topography.',
    'Engage with living indigenous heritage.',
    'Discover unique endemic wildlife and flora.',
    'Experience unfiltered Ethiopian landscapes.'
  ];

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen overflow-x-hidden selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC PARALLAX HERO (72vh to maximize view impact) */}
      <section 
        ref={heroRef}
        className="relative min-h-[75vh] lg:min-h-[80vh] w-full overflow-hidden bg-[#1A130F] flex flex-col justify-between"
      >
        {/* Parallax Media */}
        <div 
          className="absolute inset-0 w-full h-full transform scale-105"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <ImageWithFallback
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-[#FAF4EB] opacity-90 pointer-events-none" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

        {/* VIP Dossier Utility Ribbon */}
        <div className="relative z-20 pt-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/destinations')}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/35 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1.5 transition-transform" />
            <span>The Atlas Map</span>
          </button>

          <button 
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${destination.name} - Dinq Ethiopia`,
                  url: window.location.href
                });
              }
            }}
            className="h-11 w-11 rounded-full bg-black/35 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Share Expedition Data"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Huge Asymmetric Display Text */}
        <div className="relative z-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full pb-16 lg:pb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A130F] text-[#DDAA42] border border-[#DDAA42]/30 text-[10px] font-bold uppercase tracking-[0.22em] shadow-lg">
                <MapPin className="h-3.5 w-3.5" />
                <span>{destination.regionCategoryLabel || 'Geographic Sector'}</span>
              </div>
              
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.88] font-semibold tracking-tighter text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                {destination.name}
              </h1>
            </div>

            <div className="hidden md:block text-right shrink-0">
              <div className="font-serif text-[80px] lg:text-[100px] leading-none text-[#DDAA42]/30 font-light mb-[-15px] select-none">
                {destination.numeral || '01'}
              </div>
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.3em] block">
                Expedition Atlas Index
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPLIT-SCREEN RICH EDITORIAL SECTION */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Premium Meta Brief (Sticky) */}
          <div className="lg:col-span-4 relative order-2 lg:order-1">
            <div className="sticky top-32 space-y-8 text-left">
              
              {/* Dossier Meta Pass */}
              <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-[#E7D0B8]/50 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#D95F49]" />
                
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49] mb-6 block">
                  Ground Commander's Briefing
                </h4>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#FAF4EB] flex items-center justify-center shrink-0 text-[#D95F49] border border-[#E7D0B8]/50">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#A6978A] font-bold mb-0.5">
                        Best Season to Go
                      </span>
                      <span className="block text-sm font-serif font-medium text-[#302019]">
                        {destination.bestTimeToVisit || 'Year-round Access'}
                      </span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#FAF4EB] flex items-center justify-center shrink-0 text-[#D95F49] border border-[#E7D0B8]/50">
                      <Globe className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#A6978A] font-bold mb-0.5">
                        Topographic Sector
                      </span>
                      <span className="block text-sm font-serif font-medium text-[#302019]">
                        {destination.regionCategoryLabel}
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#FAF4EB] flex items-center justify-center shrink-0 text-[#D95F49] border border-[#E7D0B8]/50">
                      <Sun className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#A6978A] font-bold mb-0.5">
                        Field Protocol
                      </span>
                      <span className="block text-xs font-semibold text-[#DDAA42] uppercase tracking-wider">
                        Guarantees Included
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-[#E7D0B8]/50 space-y-3">
                  <a
                    href={waLink(`Hello Dinq! I am reading about the ${destination.name} and want to inquire about custom itinerary options.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#D95F49] hover:bg-[#302019] text-white font-bold text-[11px] tracking-widest uppercase transition-all shadow-[0_12px_24px_rgba(217,95,73,0.22)] cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4.5 h-4.5" />
                    <span>Inquire this Destination</span>
                  </a>
                </div>
              </div>

              {/* Founder's Voice Card */}
              {(destination.signature || destination.italicNote) && (
                <div className="rounded-[2rem] bg-[#1C120C] text-white p-8 border border-[#DDAA42]/20 relative overflow-hidden group shadow-xl">
                  <Quote className="absolute -right-4 -top-4 w-28 h-28 text-[#DDAA42]/10 rotate-12 transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
                  
                  <div className="relative z-10 space-y-6">
                    <p className="font-serif italic text-lg leading-relaxed text-[#FFF9F2]/95">
                      "{destination.signature || destination.italicNote}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-[#DDAA42] overflow-hidden bg-[#1A130F]">
                        <ImageWithFallback
                          src="https://ambaseltourandtravel.com/wp-content/uploads/2023/12/neww.jpg"
                          alt="Founder"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#DDAA42] font-bold block leading-tight">
                          Zerihun Alemayehu
                        </span>
                        <span className="text-[9px] text-[#A6978A] block">Chief of Expeditions</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Narrative Content & Asymmetric Focus */}
          <div className="lg:col-span-8 order-1 lg:order-2 text-left space-y-12">
            
            {/* Massive Drop Cap Literary Layout */}
            <div className="prose prose-lg max-w-none">
              <p className="font-light text-[#5B4F46] leading-[1.85] text-lg sm:text-xl">
                <span className="float-left text-7xl sm:text-8xl font-serif text-[#D95F49] leading-[0.8] pr-4 pt-2 font-medium">
                  {destination.summary.charAt(0)}
                </span>
                {destination.summary.substring(1)}
              </p>
            </div>

            {/* Custom Interactive Highlight Vignettes */}
            <div className="pt-8">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="font-serif text-3xl md:text-4xl font-medium text-[#302019]">
                  Atlas Highlights
                </h3>
                <div className="h-px flex-1 bg-[#E7D0B8]/60" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="group rounded-3xl bg-white p-6 sm:p-8 border border-[#E7D0B8]/60 hover:border-[#DDAA42]/50 transition-all duration-500 hover:shadow-xl flex flex-col justify-between min-h-[180px]"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="h-9 w-9 rounded-full bg-[#DDAA42]/10 flex items-center justify-center text-[#DDAA42]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#A6978A] group-hover:text-[#DDAA42] transition-colors">
                        SGN-0{idx + 1}
                      </span>
                    </div>

                    <p className="text-[#302019] font-serif text-base sm:text-lg font-medium leading-snug">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DYNAMIC CIRCUIT INTEGRATION (Renders actual Related live tours matching this Destination) */}
      {relatedTours.length > 0 && (
        <section className="py-24 bg-[#120D0A] text-[#FFF9F2] relative overflow-hidden">
          <div className="absolute inset-0 bg-fixed bg-cover opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80')]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/40 to-[#120D0A] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
            <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#DDAA42] mb-2 block">
                  Regional Deployments
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                  Featured {destination.name} Circuits
                </h2>
              </div>
              
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#DDAA42] hover:text-white transition-colors uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md"
              >
                <span>View Global Routes</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <ExperienceGrid tours={relatedTours} onQuickView={() => {}} />
          </div>
        </section>
      )}

      {/* 4. CLOSING REGIONAL GATEWAY CTA */}
      <div className="bg-[#F5E9DA] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTABand 
            title={`Journey Deeper into ${destination.name}`}
            subtitle="Speak with Zerihun Alemayehu and our ground coordinators to map out a custom high-elevation traverse, expedition convoy, or cultural entry schedule."
          />
        </div>
      </div>

    </div>
  );
};