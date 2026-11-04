// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  Compass,
  Award,
  Layers,
  Sparkles,
  Sliders,
  ShieldCheck,
  Tag,
  X
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { StatBand } from '../components/premium/StatBand';
import { Marquee } from '../components/premium/Marquee';
import { CTABand } from '../components/premium/CTABand';
import { RouteFlow } from '../components/premium/RouteFlow';
import { ExperienceGrid } from '../components/tours/ExperienceCard';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { FIVE_WAYS } from '../data/content/journeys';
import { TOURS_DATA, TourItem } from '../data/content/tours';
import { DESTINATIONS_DATA } from '../data/content/destinations';
import { WHY_DINQ_PILLARS, EXECUTIVE_TEAM } from '../data/content/company';
import { SHOP_CATEGORIES } from '../data/content/shop';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';
import { useBooking } from '../context/BookingContext';
import { getDeletedCatalogIds } from '../lib/catalog';

export interface HeroSlide {
  image: string;
  title: string;
  titleItalic: string;
  nativeScript?: string;
  subtitle: string;
  location: string;
  tag?: string;
  tourSlug?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1788196891/x3pjsvkwckin0nkubke3.jpg',
    title: 'Discover Ancient',
    titleItalic: 'Lalibela',
    nativeScript: 'ላሊበላ • ኢትዮጵያ',
    subtitle: 'Stand inside monolithic rock-hewn sanctuaries carved directly into red volcanic bedrock eight centuries ago.',
    location: 'Lalibela • Amhara Massif',
    tag: 'UNESCO World Heritage',
    tourSlug: '/tours',
  },
  {
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1793175061/j3r2rmi9flsvjmoz0jdz.jpg',
    title: 'The Mountains of',
    titleItalic: 'Adventure',
    nativeScript: 'ስሜን ተራሮች',
    subtitle: 'Towering 1,500-meter basalt escarpments, endemic Walia ibex, and the ancient misty realm of the Gelada baboons.',
    location: 'Simien Mountains National Park',
    tag: 'Afro-Alpine Trekking',
    tourSlug: '/mountains',
  },
  {
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1791473046/ltmcrvpqcx4iuwlu7fld.jpg',
    title: 'Venture into the',
    titleItalic: 'Great Rift',
    nativeScript: 'ዳናኪል • አፋር',
    subtitle: 'Planetary geothermal wonders, iridescent sulfur terraces at Dallol, and centuries-old Afar camel salt caravans.',
    location: 'Danakil Depression • Afar',
    tag: 'Geothermal Frontier',
    tourSlug: '/tours',
  },
  {
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1789937754/ctzbwpnlytehkv6zznb5.jpg',
    title: 'Experience Ancestral',
    titleItalic: 'Traditions',
    nativeScript: 'ኦሞ ሸለቆ',
    subtitle: 'Living cultures and community-guided encounters along the sacred waters of the Lower Omo River basin.',
    location: 'Lower Omo River Basin',
    tag: 'Living Heritage',
    tourSlug: '/journeys/community-culture',
  },
];

const HERO_COORDS = [
  '12.03°N, 39.05°E',
  '13.20°N, 38.20°E',
  '14.24°N, 40.30°E',
  '5.00°N, 36.50°E',
];

const HERO_PUSH = [
  'scale(1.17) translate3d(-1.5%, -1%, 0)',
  'scale(1.17) translate3d(1.5%, -0.5%, 0)',
  'scale(1.17) translate3d(-1%, 1%, 0)',
  'scale(1.17) translate3d(1%, 0.5%, 0)',
];
const HERO_REST = 'scale(1.04) translate3d(0, 0, 0)';
const BAR_H = 'clamp(14px, 3.2vh, 36px)';

const BRAND_MARQUEE_LINES = [
  'Discover Ethiopia Beyond the Ordinary',
  'One Country. Many Worlds.',
  'Discover the Places · Meet the People · Live the Story',
  'Travel Deeper. Experience More. Travel with Purpose.',
  'Don’t Just Visit Ethiopia. Experience It.',
];

const DETAILED_PILLARS = [
  {
    numeral: '01',
    title: '10+ YEARS OF EXPERIENCE',
    desc: 'A decade of experience across tourism, guiding, media, communication, events, and destination experiences.',
    icon: Award,
  },
  {
    numeral: '02',
    title: 'LOCAL EXPERTISE',
    desc: 'We know Ethiopia beyond the usual tourist routes.',
    icon: Compass,
  },
  {
    numeral: '03',
    title: 'ONE-STOP EXPERIENCE',
    desc: 'Tourism, travel, events, transportation, guiding, outdoor experiences, and destination services under one platform.',
    icon: Layers,
  },
  {
    numeral: '04',
    title: 'AUTHENTIC EXPERIENCES',
    desc: 'We focus on meaningful encounters with Ethiopia’s people, culture, nature, heritage, and communities.',
    icon: Sparkles,
  },
  {
    numeral: '05',
    title: 'CUSTOM JOURNEYS',
    desc: 'Every traveler is different. We build journeys around your interests, style, time, and expectations.',
    icon: Sliders,
  },
  {
    numeral: '06',
    title: 'PROFESSIONAL TEAM',
    desc: 'Experienced guides, drivers, coordinators, event professionals, destination experts, and support teams.',
    icon: ShieldCheck,
  },
];

export const Home: React.FC = () => {
  useEffect(() => {
    updatePageMeta(
      'Dinq Tour, Travel & Events — Discover Ethiopia Beyond the Ordinary',
      'Curated expeditions, alpine mountain trekking, rare wildlife safaris, and living cultural festivals across Ethiopia. 10+ years of ground mastery.',
      '/'
    );
  }, []);

  const { openBooking } = useBooking();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [activePanel, setActivePanel] = useState<number>(0);
  const [activeModalTour, setActiveModalTour] = useState<TourItem | null>(null);
  const [deletedTourIds, setDeletedTourIds] = useState<Set<string>>(() => new Set());
  const [deletedDestinationIds, setDeletedDestinationIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    let active = true;
    Promise.all([getDeletedCatalogIds('tours'), getDeletedCatalogIds('destinations')])
      .then(([tourIds, destinationIds]) => {
        if (!active) return;
        setDeletedTourIds(tourIds);
        setDeletedDestinationIds(destinationIds);
      })
      .catch(error => console.error('Failed to sync deleted catalog items:', error));

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isHeroPaused) return;
    const intervalTime = 6500;
    const stepTime = 50;
    const increment = (stepTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isHeroPaused, currentSlide]);

  const handleNextSlide = () => {
    setSlideProgress(0);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setSlideProgress(0);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSelectSlide = (index: number) => {
    setSlideProgress(0);
    setCurrentSlide(index);
  };

  const heroRef = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const activeSlide = HERO_SLIDES[currentSlide];
  const pad = (n: number) => String(n).padStart(2, '0');

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setHeroReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const handleHeroMouseLeave = () => {
    setIsHeroPaused(false);
    heroRef.current?.style.setProperty('--px', '0');
    heroRef.current?.style.setProperty('--py', '0');
  };

  const safeTours = (TOURS_DATA || []).filter(tour => !deletedTourIds.has(tour.id));
  const safeDestinations = (DESTINATIONS_DATA || []).filter(destination => !deletedDestinationIds.has(destination.id));
  const safeShopCategories = SHOP_CATEGORIES || [];
  const featuredTours = safeTours.filter((t) => t.featured).slice(0, 3);
  
  const founder = EXECUTIVE_TEAM?.[0] || {
    name: 'Zerihun Alemayehu',
    role: 'Founder & COO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  };

  const pillarsToRender = DETAILED_PILLARS.map((pillar, idx) => {
    const raw = WHY_DINQ_PILLARS?.[idx];
    return {
      numeral: raw?.numeral || pillar.numeral,
      title: raw?.title || pillar.title,
      desc: raw?.desc || pillar.desc,
      icon: pillar.icon,
    };
  });

  const destScrollRef = useRef<HTMLDivElement>(null);
  const [isDestPaused, setIsDestPaused] = useState(false);
  const carouselDestinations = [...safeDestinations, ...safeDestinations];

  useEffect(() => {
    let animationId: number;
    const scrollSpeed = 0.8; 

    const scroll = () => {
      if (destScrollRef.current && !isDestPaused) {
        destScrollRef.current.scrollLeft += scrollSpeed;
        if (destScrollRef.current.scrollLeft >= destScrollRef.current.scrollWidth / 2) {
          destScrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDestPaused]);

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] overflow-x-hidden selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC HERO — GOLDEN GRADIENT MONUMENTAL TYPOGRAPHY & CIRCULAR THUMBNAILS */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[calc(100vh-5rem)] lg:min-h-[760px] overflow-hidden bg-[#0B0807] flex flex-col justify-between"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        aria-label="Expedition Highlights"
      >
        <style>{`
          @keyframes cineFromBlack { from { opacity: 1; } to { opacity: 0; } }
          @keyframes cineBars { from { height: 20vh; } to { height: ${BAR_H}; } }
          @keyframes cineRise {
            from { opacity: 0; transform: translateY(24px); filter: blur(10px); }
            to   { opacity: 1; transform: none; filter: blur(0); }
          }
          @keyframes cineLetter {
            from { opacity: 0; transform: translateY(0.3em); filter: blur(14px); }
            to   { opacity: 1; transform: none; filter: blur(0); }
          }
          @keyframes cineRule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @media (prefers-reduced-motion: reduce) {
            .cine-anim { animation: none !important; }
            .cine-push { transition: none !important; }
          }
        `}</style>

        {/* Background Film Plates with Slow Push-In & Mouse Parallax */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          const pushing = isActive && heroReady;
          return (
            <div
              key={idx}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
                transition: 'opacity 1600ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              aria-hidden={!isActive}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform:
                    'translate3d(calc(var(--px, 0) * -18px), calc(var(--py, 0) * -10px), 0) scale(1.06)',
                  transition: 'transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                <div
                  className="cine-push absolute inset-0 will-change-transform"
                  style={{
                    transform: pushing ? HERO_PUSH[idx % HERO_PUSH.length] : HERO_REST,
                    transition: pushing
                      ? 'transform 14000ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s'
                      : 'transform 0s linear 1700ms',
                  }}
                >
                  <ImageWithFallback src={slide.image} alt={slide.location} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Atmospheric Overlays */}
        <div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(135deg, rgba(14,58,62,0.45) 0%, rgba(14,58,62,0) 45%, rgba(217,95,73,0.40) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(11,8,7,0.92) 0%, rgba(11,8,7,0.42) 35%, rgba(11,8,7,0.25) 65%, rgba(11,8,7,0.6) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.72) 100%)',
          }}
        />
        <div className="grain absolute inset-0 z-10 opacity-30 pointer-events-none" />

        {/* Widescreen Letterbox Bars */}
        <div
          className="cine-anim absolute top-0 inset-x-0 z-30 bg-black pointer-events-none"
          style={{ height: BAR_H, animation: 'cineBars 1800ms cubic-bezier(0.7, 0, 0.2, 1) both' }}
        />
        <div
          className="cine-anim absolute bottom-0 inset-x-0 z-30 bg-black pointer-events-none"
          style={{ height: BAR_H, animation: 'cineBars 1800ms cubic-bezier(0.7, 0, 0.2, 1) both' }}
        />

        {/* Initial Fade From Black */}
        <div
          className="cine-anim absolute inset-0 z-40 bg-black pointer-events-none"
          style={{ animation: 'cineFromBlack 1600ms ease-out 200ms both' }}
        />

        {/* Top-Left Tag & Top-Right Scene Marker */}
        <div
          key={`meta-${currentSlide}`}
          className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-start justify-between"
          style={{ paddingTop: `calc(${BAR_H} + 1.25rem)` }}
        >
          {activeSlide.tag ? (
            <div className="flex items-center gap-3">
              <span
                className="cine-anim block h-px w-10 sm:w-14 origin-left bg-[#DDAA42]"
                style={{ animation: 'cineRule 1100ms cubic-bezier(0.7, 0, 0.2, 1) 300ms both' }}
              />
              <span
                className="cine-anim text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#E9D3A6] font-semibold"
                style={{ animation: 'cineRise 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) 500ms both' }}
              >
                {activeSlide.tag}
              </span>
            </div>
          ) : <div />}

          <div
            className="cine-anim text-right"
            style={{ animation: 'cineRise 1100ms cubic-bezier(0.2, 0.8, 0.2, 1) 400ms both' }}
          >
            <div className="font-serif text-xs sm:text-sm text-white/80">
              Scene {pad(currentSlide + 1)} of {pad(HERO_SLIDES.length)}
            </div>
            <div className="mt-0.5 flex items-center justify-end gap-1.5 text-[11px] text-[#E9D3A6]">
              <MapPin className="h-3 w-3" />
              <span>{activeSlide.location}</span>
            </div>
            <div className="font-serif italic text-[10px] text-white/45">
              {HERO_COORDS[currentSlide]}
            </div>
          </div>
        </div>

        {/* CENTERPIECE: PREMIUM GOLDEN GRADIENT TYPOGRAPHY (NO RED CIRCLE) */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 text-center my-auto py-6">
          <div key={currentSlide} className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto">

            {/* Subtle Ambient Gold Glow Behind Text for Contrast */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[180px] sm:w-[520px] sm:h-[240px] rounded-full bg-[#DDAA42]/10 blur-[90px]"
            />

            {/* Upper Native Script & Kicker with Ornamental Gold Rules */}
            <div
              className="cine-anim relative z-10 mb-3 sm:mb-4 flex flex-col items-center"
              style={{ animation: 'cineRise 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) 450ms both' }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#DDAA42]/80" />
                <span className="text-base sm:text-xl md:text-2xl font-light tracking-[0.28em] text-[#F5E6C8] drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]">
                  {activeSlide.nativeScript || activeSlide.title}
                </span>
                <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#DDAA42]/80" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.38em] text-[#E9D3A6]/90">
                {activeSlide.title.trim()}
              </span>
            </div>

            {/* Balanced Single-Line Main Title with Top-to-Bottom Golden Gradient */}
            <h1
              aria-label={`${activeSlide.title.trim()} ${activeSlide.titleItalic}`}
              className="relative z-10 font-serif font-semibold uppercase whitespace-nowrap text-[2.35rem] sm:text-[4.25rem] md:text-[5.25rem] lg:text-[6.25rem] leading-[1.02] tracking-[0.1em] sm:tracking-[0.14em] select-none"
              style={{ filter: 'drop-shadow(0 14px 32px rgba(0,0,0,0.75))' }}
            >
              {activeSlide.titleItalic.toUpperCase().split('').map((ch, i) => (
                <span
                  key={i}
                  className="cine-anim inline-block"
                  style={{
                    animation: `cineLetter 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) ${650 + i * 65}ms both`,
                  }}
                >
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF9] via-[#F3DCA2] to-[#C48B22] pb-2 -mb-2">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subtitle & Action Buttons */}
            <p
              className="cine-anim relative z-10 mt-5 sm:mt-6 max-w-xl text-xs sm:text-base text-white/85 font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              style={{ animation: 'cineRise 1100ms cubic-bezier(0.2, 0.8, 0.2, 1) 1350ms both' }}
            >
              {activeSlide.subtitle}
            </p>

            <div
              className="cine-anim relative z-10 mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
              style={{ animation: 'cineRise 1100ms cubic-bezier(0.2, 0.8, 0.2, 1) 1600ms both' }}
            >
              <button
                type="button"
                onClick={() => openBooking()}
                className="px-8 py-3.5 rounded-full bg-gradient-to-b from-[#E5B85B] to-[#C88E26] hover:from-[#F0C76E] hover:to-[#D49A30] text-[#18110D] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(221,170,66,0.35)] hover:shadow-[0_0_44px_rgba(221,170,66,0.6)] cursor-pointer"
              >
                Explore
              </button>
              {activeSlide.tourSlug && (
                <Link
                  to={activeSlide.tourSlug}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/40 hover:bg-white/15 border border-[#DDAA42]/40 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.15em] text-[#FFF9F2] transition-all"
                >
                  <span>See this journey</span>
                  <ArrowRight className="h-4 w-4 text-[#DDAA42] transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          {/* Left/Right Floating Slide Arrows (Desktop) */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/35 hover:bg-[#DDAA42]/20 backdrop-blur-md border border-white/20 hover:border-[#DDAA42]/60 items-center justify-center text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next slide"
            className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/35 hover:bg-[#DDAA42]/20 backdrop-blur-md border border-white/20 hover:border-[#DDAA42]/60 items-center justify-center text-white transition-all cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* BOTTOM NAVIGATION: 4 CIRCULAR THUMBNAILS WITH DASHED RINGS & ORBITING DOT */}
        <div
          className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"
          style={{ paddingBottom: `calc(${BAR_H} + 1.5rem)` }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 pt-4">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              const dotAngle = isActive ? (slideProgress / 100) * 360 - 45 : idx * 65 - 30;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  aria-label={`Go to ${slide.titleItalic}`}
                  aria-current={isActive}
                  className={`group flex items-center gap-3.5 sm:gap-4 text-left cursor-pointer transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-[1.02]' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {/* Circular Thumbnail with Dashed Ring & Orbiting Dot */}
                  <div className="relative h-14 w-14 sm:h-20 sm:w-20 shrink-0 flex items-center justify-center">
                    {/* Outer Dashed Ring */}
                    <div
                      className={`absolute inset-0 rounded-full border border-dashed transition-colors duration-500 ${
                        isActive ? 'border-[#DDAA42]' : 'border-white/45 group-hover:border-[#DDAA42]/75'
                      }`}
                    />

                    {/* Rotating Container for the Indicator Dot */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-75 ease-linear"
                      style={{ transform: `rotate(${dotAngle}deg)` }}
                    >
                      <span
                        className={`block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-b from-[#FFF3D1] to-[#DDAA42] shadow-[0_0_10px_#DDAA42] mx-auto -mt-1.5 transition-transform duration-300 ${
                          isActive ? 'scale-110' : 'scale-90 opacity-80'
                        }`}
                      />
                    </div>

                    {/* Circular Photo Thumbnail */}
                    <div className="h-11 w-11 sm:h-16 sm:w-16 rounded-full overflow-hidden border border-white/25 bg-[#1A130F] shadow-lg">
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.titleItalic}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Kicker & Bold Destination Title */}
                  <div className="min-w-0">
                    <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#E9D3A6]/80 truncate">
                      {slide.title.trim()} IN
                    </span>
                    <span className="block font-serif text-base sm:text-2xl font-semibold text-white tracking-tight leading-tight mt-0.5 truncate group-hover:text-[#DDAA42] transition-colors">
                      {slide.titleItalic}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Editorial Brand Statement */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="eyebrow mb-4">Our Philosophy</span>
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#302019] leading-[1.3] text-balance">
          "Travel in Ethiopia should never be reduced to passive sightseeing.
          It is an invitation to cross ancient thresholds, sit with village elders around the hearth,
          walk mist-swathed afro-alpine trails, and travel with profound respect for the living story."
        </blockquote>
        <div className="mt-6 font-serif italic text-base sm:text-lg text-[#D95F49]">
          Discover the Places · Meet the People · Live the Story
        </div>
      </section>

      {/* 3. Marquee Ribbon */}
      <Marquee items={BRAND_MARQUEE_LINES} speed="normal" dark={true} />

      {/* 4. Stat Band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
        <StatBand />
      </div>

      {/* 5. Featured Journeys */}
      <section className="relative isolate overflow-hidden bg-[#14100D] py-24 md:py-32 text-[#F6EDE0]">
        <div aria-hidden className="absolute -left-40 top-20 -z-10 h-[560px] w-[560px] rounded-full bg-[#B98A4E]/15 blur-[140px]" />
        <div className="grain absolute inset-0 -z-10 opacity-50" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="eyebrow !text-[#DDAA42]">Curated Expeditions</span>
              <h2 className="mt-1.5 font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] text-[#F6EDE0]">
                Featured Journeys
              </h2>
            </div>
            <Link to="/tours" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E9D3A6] hover:text-white transition-colors">
              <span>View all {safeTours.length || 15} tours</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ExperienceGrid tours={featuredTours} onQuickView={setActiveModalTour} />
        </div>
      </section>

      {/* 6. Premium Expanding Gateways (Five Ways) */}
      <section className="py-24 md:py-32 bg-[#F5E9DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <span className="eyebrow !tracking-[0.3em]">Five Gateways</span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#302019]">
              The Ethiopian Compass
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#78685E] font-light leading-relaxed">
              Every cardinal direction reveals a distinct cultural and ecological world: from medieval stone kingdoms in the North to wild rainforest coffee in the West.
            </p>
          </div>

          <div className="hidden lg:flex gap-4 h-[600px] w-full">
            {FIVE_WAYS.map((way, idx) => {
              const isExpanded = activePanel === idx;
              return (
                <div
                  key={way.id}
                  onMouseEnter={() => setActivePanel(idx)}
                  className={`group relative overflow-hidden rounded-[24px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isExpanded ? 'flex-[3.5] shadow-2xl' : 'flex-[1] shadow-md hover:shadow-lg'
                  } bg-[#1A130F]`}
                >
                  <ImageWithFallback src={way.image} alt={way.name} className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${isExpanded ? 'scale-105 opacity-100 grayscale-0' : 'scale-100 opacity-50 grayscale-[40%]'}`} />
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/60 to-transparent transition-opacity duration-700 ${isExpanded ? 'opacity-95' : 'opacity-100'}`} />
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-700 ease-out translate-y-0">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 mb-2 block ${isExpanded ? 'text-[#DDAA42]' : 'text-[#DDAA42]/70'}`}>{way.verb}</span>
                      <h3 className={`font-serif font-medium transition-all duration-700 text-white ${isExpanded ? 'text-4xl' : 'text-2xl md:text-3xl'}`}>{way.name}</h3>
                      <p className={`text-sm font-light mt-2 transition-colors duration-700 ${isExpanded ? 'text-white/90' : 'text-white/60 line-clamp-2 leading-relaxed'}`}>{way.subtitle}</p>
                    </div>

                    <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                      <p className="text-[13px] leading-relaxed text-white/70 font-light line-clamp-3">{way.summary}</p>
                      <Link to={way.routeSlug} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#DDAA42] hover:text-white transition-colors">
                        <span>Explore {way.name}</span><ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  {isExpanded && <div className="absolute inset-0 border border-[#DDAA42]/20 rounded-[24px] pointer-events-none" />}
                </div>
              );
            })}
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FIVE_WAYS.map((way) => (
              <div key={way.id} className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#1A130F] shadow-lg">
                <ImageWithFallback src={way.image} alt={way.name} className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/60 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DDAA42] mb-1.5">{way.verb}</span>
                  <h3 className="font-serif text-3xl font-medium">{way.name}</h3>
                  <p className="text-xs text-white/70 font-light mt-2 line-clamp-2">{way.subtitle}</p>
                  <Link to={way.routeSlug} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#DDAA42]">
                    <span>Explore</span><ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DOCUMENTARY EYE SHOWCASE */}
      <section className="py-24 md:py-36 bg-[#F5E9DA]" onMouseEnter={() => setIsDestPaused(true)} onMouseLeave={() => setIsDestPaused(false)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="eyebrow !tracking-[0.3em]">Documentary Eye</span>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-medium text-[#302019] tracking-tight">Ethiopian Destinations in Focus</h2>
            </div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden flex pb-12 pt-4">
          <div ref={destScrollRef} className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar w-full px-4 sm:px-8" style={{ scrollBehavior: 'auto' }}>
            {carouselDestinations.map((dest, i) => (
              <div key={`${dest.id}-${i}`} className="min-w-[320px] sm:min-w-[380px] max-w-[400px] shrink-0 group cursor-pointer">
                <div className="relative rounded-[24px] overflow-hidden bg-[#FFF9F2] border border-[#E7D0B8]/40 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A130F]">
                    <ImageWithFallback src={dest.image} alt={dest.name} className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-5 font-serif text-[64px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] select-none">{dest.numeral}</div>
                    <div className="absolute bottom-4 left-5 right-5"><span className="font-serif italic text-sm text-white/90 drop-shadow-md">"{dest.signature}"</span></div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49] mb-2 block">{dest.regionCategoryLabel}</span>
                    <h3 className="font-serif text-2xl font-medium text-[#302019] mb-3 group-hover:text-[#D95F49] transition-colors duration-300">{dest.name}</h3>
                    <p className="text-[13px] text-[#78685E] font-light leading-relaxed line-clamp-2">{dest.summary}</p>
                    <div className="mt-auto pt-8 flex items-center justify-between">
                      <span className="text-xs text-[#78685E]">Best: <span className="font-medium text-[#302019]">{(dest.bestTimeToVisit || 'Year-round').split('(')[0]}</span></span>
                      <Link to={`/destinations/${dest.id}`} className="text-[13px] font-medium text-[#D95F49] flex items-center gap-1 group-hover:text-[#C04C37] transition-colors">Explore <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY DISCERNING TRAVELERS CHOOSE DINQ - REDESIGNED GRID */}
      <section className="relative py-24 md:py-36 bg-[#FAF4EB] text-[#302019] overflow-hidden">
        <div aria-hidden className="absolute -right-36 top-1/4 h-[600px] w-[600px] rounded-full bg-[#DDAA42]/10 blur-[120px] pointer-events-none" />
        <div aria-hidden className="absolute -left-36 bottom-10 h-[500px] w-[500px] rounded-full bg-[#D95F49]/5 blur-[120px] pointer-events-none" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
            
            {/* Left: Strict 2-Column Minimal Grid */}
            <div className="lg:col-span-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {pillarsToRender.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.numeral} className="group relative rounded-3xl bg-gradient-to-b from-[#2A1D18] to-[#1C120C] p-6 sm:p-8 border border-[#DDAA42]/20 hover:border-[#DDAA42]/60 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(221,170,66,0.15)] hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div className="text-[#DDAA42] group-hover:scale-110 group-hover:text-[#D95F49] transition-all duration-500 origin-left">
                          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.25} />
                        </div>
                        <span className="font-mono text-sm font-light tracking-widest text-[#DDAA42]/30 group-hover:text-[#DDAA42]/80 transition-colors">{pillar.numeral}</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#FFF9F2] group-hover:text-[#DDAA42] transition-colors leading-snug uppercase tracking-wide">{pillar.title}</h3>
                      <p className="mt-3 text-xs sm:text-[13px] text-[#D0C2B6] font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-[#DDAA42]/10 flex items-center gap-2 text-[10px] font-bold text-[#DDAA42] uppercase tracking-widest transition-colors">
                      <span>Expedition Benchmark</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Sticky Founder Note */}
            <div className="lg:col-span-4 w-full flex flex-col justify-center rounded-3xl bg-gradient-to-br from-[#2A1D18] via-[#20150E] to-[#140D09] p-8 sm:p-10 border border-[#DDAA42]/30 shadow-2xl relative overflow-hidden group h-fit lg:sticky lg:top-32">
              <div aria-hidden className="absolute -top-6 -right-6 font-serif text-[180px] leading-none text-[#DDAA42]/5 select-none pointer-events-none group-hover:scale-105 transition-transform duration-700">“</div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#DDAA42] mb-6 flex items-center gap-2">
                  <span className="h-px w-6 bg-[#DDAA42]"></span>
                  A Word From Our Founder
                </span>
                
                <blockquote className="font-serif italic text-xl sm:text-[22px] text-[#FFF9F2] leading-[1.6] font-light text-pretty">
                  "Ethiopia is not just a destination you visit; it is a timeless realm that transforms how you see the world. Our mission with Dinq is to guide you with honesty, deep cultural honor, and meticulous safety."
                </blockquote>
                
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-[#DDAA42]/20">
                      <ImageWithFallback src={founder.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'} alt={founder.name} className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#FFF9F2] tracking-wide">{founder.name}</h4>
                      <p className="text-[10px] font-semibold text-[#DDAA42] uppercase tracking-wider mt-0.5">Founder & COO</p>
                    </div>
                  </div>
                  
                  <a href={waLink("Hello Zerihun! I am reaching out to inquire directly about an expedition with Dinq.")} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#1C120C] border border-[#DDAA42]/30 flex items-center justify-center text-[#DDAA42] hover:bg-[#DDAA42] hover:text-[#1C120C] transition-all shadow-sm" title="Direct WhatsApp Line">
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. BESPOKE TWO-UP TEASER */}
      <section className="py-24 md:py-36 bg-[#F5E9DA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1: Transit Hub */}
            <div className="group relative rounded-[2.5rem] bg-white p-8 md:p-12 border border-[#E7D0B8]/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-visible flex flex-col justify-between">
              <div className="relative z-10 mt-16 sm:mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D95F49] bg-[#FAF4EB] px-4 py-1.5 rounded-full border border-[#E7D0B8]">
                    Transit Hub
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#302019] leading-tight">
                  Addis Ababa <br/><span className="text-[#DDAA42] italic font-normal">Stopover Experience</span>
                </h3>
                <p className="mt-5 text-sm text-[#78685E] font-light leading-relaxed max-w-xs md:max-w-sm">
                  Connecting through Bole Airport? Turn hours into memories with curated private transit itineraries featuring VIP airport meet-and-assist.
                </p>
                 
                <div className="mt-8 bg-[#FAF4EB] rounded-2xl p-6 border border-[#E7D0B8]/50">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A6978A] block mb-4">Transit Route</span>
                  <RouteFlow stops={['Arrive Bole', 'Discover Addis', 'Experience Ethiopia', 'Extend']} dark={false} size="sm" />
                </div>
              </div>

              <div className="relative z-10 mt-10 flex items-center justify-between pt-6 border-t border-[#E7D0B8]/50">
                <div className="flex items-center gap-2 text-xs text-[#78685E] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#DDAA42]" /> Private VIP Meet & Assist
                </div>
                <Link to="/about#stopover" className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#D95F49] text-white hover:scale-110 hover:bg-[#C04C37] transition-all shadow-[0_0_20px_rgba(217,95,73,0.3)]">
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Card 2: Provisions */}
            <div className="group relative rounded-[2.5rem] bg-gradient-to-br from-[#2A1D18] to-[#1C120C] p-8 md:p-12 border border-[#DDAA42]/20 shadow-xl hover:shadow-[0_20px_50px_rgba(221,170,66,0.15)] transition-all duration-500 overflow-visible flex flex-col justify-between mt-0 lg:mt-12">
              <div className="grain absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none rounded-[2.5rem]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#DDAA42] bg-[#302019] px-4 py-1.5 rounded-full border border-[#DDAA42]/30">
                    Provisions
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#FFF9F2] leading-tight">
                  Travel & Gear <br/><span className="text-[#DDAA42] italic font-normal">Basecamp Shop</span>
                </h3>
                <p className="mt-5 text-sm text-[#D0C2B6] font-light leading-relaxed max-w-xs md:max-w-sm">
                  Field-tested trekking boots, technical layering, backpacks, and signature Urban Camping merchandise ready for your expedition.
                </p>
                <div className="mt-10 flex flex-wrap gap-2.5 max-w-[80%] sm:max-w-none relative z-10">
                  {safeShopCategories.slice(0, 5).map((cat) => (
                    <span key={cat.id} className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-[#302019]/80 border border-[#DDAA42]/20 rounded-full px-3 py-1.5 text-[#E7C175] backdrop-blur-sm shadow-sm">
                      <Tag className="w-3 h-3 opacity-70" />
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative z-10 mt-20 sm:mt-24 flex items-center justify-between pt-6 border-t border-[#DDAA42]/20">
                <div className="flex items-center gap-2 text-xs text-[#E7D0B8]/60 font-medium">
                  <MapPin className="w-4 h-4 text-[#DDAA42]" /> Stocked in Addis Ababa
                </div>
                <Link to="/shop" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-transparent border border-[#DDAA42]/50 text-[#DDAA42] hover:bg-[#DDAA42] hover:text-[#1C120C] transition-all gap-2 font-semibold text-xs tracking-wider uppercase backdrop-blur-md">
                  <span>Explore Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. CTABand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-12">
        <CTABand />
      </div>

      {/* Quick View Modal */}
      {activeModalTour && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1713]/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-lg bg-[#FFF9F2] p-6 sm:p-8 text-[#302019] shadow-xl border border-[#E7D0B8] my-8">
            <button type="button" onClick={() => setActiveModalTour(null)} className="absolute top-5 right-5 h-8 w-8 rounded-full bg-[#FAF4EB] border border-[#E7D0B8] flex items-center justify-center text-[#78685E] hover:text-[#302019] transition-colors z-10 cursor-pointer"><X className="h-4 w-4" /></button>
            <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-5 bg-[#302019]">
              <ImageWithFallback src={activeModalTour.image} alt={activeModalTour.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#FFF9F2]/95 text-[#302019] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm border border-[#E7D0B8]">{activeModalTour.categoryLabel}</div>
              <div className="absolute bottom-3 left-3 text-xs font-semibold bg-[#302019]/85 text-[#FFF9F2] px-3 py-1 rounded-sm">{activeModalTour.durationLabel} · {activeModalTour.difficulty}</div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D95F49]">{activeModalTour.metaSummary}</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 leading-snug">{activeModalTour.title}</h3>
            <p className="text-xs text-[#78685E] mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#D95F49]" /><span>{activeModalTour.destination}</span></p>
            <p className="mt-3 text-sm text-[#78685E] font-light leading-relaxed">{activeModalTour.summary}</p>
            <div className="mt-5 border-t border-[#E7D0B8] pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#302019] mb-2">Curated Highlights</h4>
              <div className="space-y-1.5">
                {activeModalTour.highlights?.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#78685E]"><Check className="h-3.5 w-3.5 text-[#D95F49] mt-0.5 shrink-0" /><span>{h}</span></div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-[#E7D0B8] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase text-[#78685E] block leading-none">Starting from</span>
                <span className="font-serif text-2xl font-bold text-[#302019]">${(activeModalTour.priceFromUSD || 0).toLocaleString()} <span className="text-xs font-normal text-[#78685E]">USD / person</span></span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link to={`/tours/${activeModalTour.id}`} className="px-5 py-2.5 rounded border border-[#302019] text-[#302019] text-xs font-semibold hover:bg-[#302019] hover:text-[#FFF9F2] transition-colors">View Full Itinerary</Link>
                <button type="button" onClick={() => { const title = activeModalTour.title; setActiveModalTour(null); openBooking(title); }} className="btn-terracotta !py-2.5 !px-5 text-xs font-semibold cursor-pointer shadow-sm"><span>Book This Tour</span></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};