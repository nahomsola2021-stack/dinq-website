// src/pages/TourDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Clock, Calendar, Shield, Check, X,
  Coffee, Mountain, Users, ChevronRight, Share2, Compass, CheckCircle2
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';

// Import ALL data pools so no expedition is ever "Lost"
import { TOURS_DATA } from '../data/content/tours';
import { SAFARIS, MOUNTAINS, BIRDING_JOURNEYS, BIRDING_DESTINATIONS } from '../data/content/wild';
import { FESTIVALS, FESTIVAL_JOURNEYS, SHEWA_DESTINATIONS, SHEWA_JOURNEYS } from '../data/content/culture';
import { NATIONAL_ROUTES } from '../data/content/journeys';

import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { waLink } from '../lib/whatsapp';
import { useBooking } from '../context/BookingContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';

const ALL_EXPEDITIONS = [
  ...TOURS_DATA,
  ...(SAFARIS || []),
  ...(MOUNTAINS || []),
  ...(BIRDING_JOURNEYS || []),
  ...(BIRDING_DESTINATIONS || []),
  ...(FESTIVALS || []),
  ...(FESTIVAL_JOURNEYS || []),
  ...(SHEWA_DESTINATIONS || []),
  ...(SHEWA_JOURNEYS || []),
  ...(NATIONAL_ROUTES || [])
];

// FIXED: Dynamic fallback generator so days are never identical
const generateFallbackItinerary = (durationLabel: string, tourTitle: string) => {
  const days = parseInt(durationLabel) || 3;
  
  const dynamicDescriptions = [
    "Wake up to the crisp Ethiopian morning. After a curated breakfast featuring fresh highland coffee, embark on a guided exploration of ancient monoliths and stunning topography. Midday features a private culinary experience, followed by afternoon encounters.",
    "Journey deeper into the heart of the region. Today's route offers dramatic escarpment views, encounters with local artisans, and off-grid wilderness exploration. Return to your luxury basecamp by dusk.",
    "Immerse yourself in the local ecosystem. Spend the day tracking native wildlife, engaging with community elders, and understanding the rich heritage of the land.",
    "Traverse changing landscapes as our expedition convoy moves to the next topographical sector. Capture stunning photography during the golden hour.",
    "A day of cultural resonance and unscripted encounters. Participate in traditional ceremonies and dine on authentic highland gastronomy by the evening hearth.",
    "Ascend into the high altitude micro-climates. Today is dedicated to breathtaking panoramic vistas, specialized trail navigation, and serene isolation in nature."
  ];

  return Array.from({ length: days }).map((_, i) => ({
    day: i + 1,
    title: i === 0 ? 'Arrival & Expedition Briefing' : i === days - 1 ? 'Final Discoveries & Departure' : `Expedition Sector 0${i + 1}`,
    description: dynamicDescriptions[i % dynamicDescriptions.length],
    lodging: 'Premium Eco-Lodge or Curated Camp',
    meals: 'Breakfast, Lunch, Dinner'
  }));
};

export const TourDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openBooking } = useBooking();
  const [scrollY, setScrollY] = useState(0);
  
  const [tour, setTour] = useState<any>(
    ALL_EXPEDITIONS.find((t) => t.id === slug || (t as any).slug === slug)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchTourOverride = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tours'));
        querySnapshot.forEach(doc => {
          const dbData = doc.data();
          if (doc.id === slug || dbData.slug === slug) {
            if (dbData.status === 'Deleted') {
              setTour(null);
              return;
            }
            setTour((prev: any) => ({
              ...prev,
              ...dbData,
              title: dbData.title || prev?.title,
              priceFromUSD: dbData.price || prev?.priceFromUSD,
              image: dbData.image || dbData.coverImage || prev?.image,
              summary: dbData.description || dbData.summary || prev?.summary,
              itinerary: dbData.itinerary && dbData.itinerary.length > 0 ? dbData.itinerary : prev?.itinerary,
            }));
          }
        });
      } catch (err) {
        console.error("Failed to sync live tour data:", err);
      }
    };
    if (slug) fetchTourOverride();
  }, [slug]);

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF4EB] text-[#302019] px-4">
        <div className="p-8 max-w-md bg-white rounded-3xl border border-[#E7D0B8]/60 shadow-xl text-center space-y-6">
          <Compass className="h-16 w-16 text-[#D95F49] mx-auto animate-spin-slow" strokeWidth={1} />
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#302019]">Expedition Lost</h2>
          <p className="text-sm text-[#78685E] font-light leading-relaxed">
            The tour route you are looking for is currently being scouted or has been retired.
          </p>
          <button 
            onClick={() => navigate('/tours')} 
            className="w-full py-4 rounded-full bg-[#302019] hover:bg-[#D95F49] text-white font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
          >
            Return to Active Atlas
          </button>
        </div>
      </div>
    );
  }

  // FIXED: Smart Itinerary Parser
  // Tries to map real data from other files (routeStops, programmeItems) into the itinerary format first
  let itinerary = tour.itinerary;
  if (!itinerary || itinerary.length === 0) {
    if (tour.routeStops && tour.routeStops.length > 0) {
      itinerary = tour.routeStops.map((stop: string, i: number) => ({
        day: i + 1,
        title: `Explore ${stop}`,
        description: `Venture into the heart of ${stop}. Experience the unique topography, local culture, and breathtaking landscapes that define this segment of your expedition.`,
        lodging: 'Premium Basecamp or Eco-Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      }));
    } else if (tour.programmeItems && tour.programmeItems.length > 0) {
      itinerary = tour.programmeItems.map((item: string, i: number) => ({
        day: i + 1,
        title: `Curated Encounter 0${i + 1}`,
        description: item,
        lodging: 'Curated Local Hotel',
        meals: 'Breakfast, Lunch, Dinner'
      }));
    } else {
      itinerary = generateFallbackItinerary(tour.durationLabel || tour.duration || '7 Days', tour.title || tour.name);
    }
  }

  const included = tour.included || ['VIP Airport Meet & Assist', 'Private 4x4 Transportation', 'All Park Fees & Permits', 'Expert English-Speaking Guide', 'Premium Lodging', 'Curated Meals'];
  const excluded = tour.excluded || ['International Flights', 'Travel Insurance', 'Personal Gratuities', 'Alcoholic Beverages'];

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] overflow-x-hidden selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* 1. CINEMATIC EPIC HERO */}
      <section className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-[#120D0A]">
        <div 
          className="absolute inset-0 w-full h-full transform scale-105"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <ImageWithFallback
            src={tour.image || tour.coverImage}
            alt={tour.title || tour.name}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-[#120D0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120D0A]/70 via-transparent to-transparent" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

        <div className="relative z-20 pt-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/35 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1.5 transition-transform" />
            <span>Return to Atlas</span>
          </button>

          <button 
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `${tour.title || tour.name} - Dinq Ethiopia`, url: window.location.href });
              }
            }}
            className="h-11 w-11 rounded-full bg-black/35 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Share Expedition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-16 lg:pb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#DDAA42]/50 text-[9px] font-bold tracking-[0.25em] uppercase text-[#DDAA42] mb-6 shadow-lg self-start">
            <Compass className="h-3.5 w-3.5" />
            <span>{tour.categoryLabel || tour.category || 'Curated Expedition'}</span>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-medium text-[#FFF9F2] leading-[0.95] max-w-5xl drop-shadow-2xl">
            {tour.title || tour.name}
          </h1>
          
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs sm:text-[13px] font-bold tracking-widest uppercase text-[#F5E9DA]">
            <span className="flex items-center gap-2 bg-black/35 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <MapPin className="h-4 w-4 text-[#D95F49]" /> 
              {tour.destination || tour.location || 'Ethiopia'}
            </span>
            <span className="flex items-center gap-2 bg-black/35 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <Clock className="h-4 w-4 text-[#DDAA42]" /> 
              {tour.durationLabel || tour.duration || '7 Days'}
            </span>
            {tour.difficulty && (
              <span className="flex items-center gap-2 bg-black/35 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Mountain className="h-4 w-4 text-[#E7D0B8]" /> 
                {tour.difficulty}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 2. EXPEDITION DOSSIER (Main Content) */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Narrative & Timeline */}
          <div className="lg:col-span-8 text-left space-y-24">
            
            {/* Field Synopsis */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#302019]">
                  Field Synopsis
                </h2>
                <div className="h-px flex-1 bg-[#E7D0B8]/60" />
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-[#5B4F46] font-light leading-[1.85]">
                  <span className="float-left text-7xl sm:text-8xl font-serif text-[#D95F49] leading-[0.8] pr-4 pt-2 font-medium">
                    {tour.summary?.charAt(0) || tour.description?.charAt(0) || 'T'}
                  </span>
                  {(tour.summary || tour.description || '').substring(1)}
                </p>
              </div>
              
              {/* Highlight Chips */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div className="mt-12 bg-white rounded-[2rem] p-8 md:p-10 border border-[#E7D0B8]/60 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#DDAA42]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A6978A] mb-8 block">
                    Expedition Milestones
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {tour.highlights.map((highlight: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3.5 text-sm text-[#302019] font-medium leading-snug p-3 rounded-xl bg-[#FAF4EB]/50 border border-[#E7D0B8]/30">
                        <CheckCircle2 className="h-5 w-5 text-[#DDAA42] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Daily Timeline */}
            <div>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#302019]">
                  Daily Chronology
                </h2>
                <div className="h-px flex-1 bg-[#E7D0B8]/60" />
              </div>
              
              <div className="border-l-[2px] border-[#E7D0B8] ml-5 md:ml-6 space-y-16 pb-12">
                {itinerary.map((day: any) => (
                  <div key={day.day} className="relative pl-12 md:pl-16 group">
                    <div className="absolute -left-[17px] top-0 h-8 w-8 rounded-full border-[4px] border-[#FAF4EB] bg-[#D95F49] shadow-sm group-hover:scale-110 group-hover:bg-[#DDAA42] transition-all duration-300 flex items-center justify-center z-10">
                      <div className="h-1.5 w-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <span className="font-sans text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-[#D95F49] block mb-3 mt-1">
                      Day {day.day < 10 ? `0${day.day}` : day.day}
                    </span>
                    
                    <h4 className="font-serif text-2xl md:text-3xl font-semibold text-[#302019] mb-5 leading-tight group-hover:text-[#DDAA42] transition-colors duration-300">
                      {day.title}
                    </h4>
                    
                    <p className="text-sm md:text-base text-[#78685E] font-light leading-[1.8] mb-6">
                      {day.description}
                    </p>
                    
                    {(day.meals || day.lodging) && (
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-[#A6978A]">
                        {day.meals && (
                          <span className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-[#E7D0B8]/60 shadow-xs text-[#302019]">
                            <Coffee className="h-3.5 w-3.5 text-[#DDAA42]" /> {day.meals}
                          </span>
                        )}
                        {day.lodging && (
                          <span className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-[#E7D0B8]/60 shadow-xs text-[#302019]">
                            <Shield className="h-3.5 w-3.5 text-[#DDAA42]" /> {day.lodging}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 md:p-10 rounded-[2rem] border border-[#E7D0B8]/60 shadow-lg">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#302019] mb-6 flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-[#DDAA42]/15 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-[#DDAA42]" />
                  </div>
                  Provisioned
                </h3>
                <ul className="space-y-4">
                  {included.map((item: string, i: number) => (
                    <li key={i} className="text-xs font-medium text-[#78685E] flex items-start gap-3">
                      <span className="text-[#DDAA42] mt-1 text-[9px]">■</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#302019] mb-6 flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-[#D95F49]/10 flex items-center justify-center">
                    <X className="h-3.5 w-3.5 text-[#D95F49]" />
                  </div>
                  Not Covered
                </h3>
                <ul className="space-y-4">
                  {excluded.map((item: string, i: number) => (
                    <li key={i} className="text-xs font-medium text-[#78685E] flex items-start gap-3">
                      <span className="text-[#D95F49] mt-1 text-[9px]">■</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky VIP Booking Dossier */}
          <div className="lg:col-span-4 relative order-first lg:order-last mb-12 lg:mb-0">
            <div className="sticky top-28 bg-[#1A130F] rounded-[2rem] border border-[#DDAA42]/30 shadow-2xl p-8 sm:p-10 text-white overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#DDAA42]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DDAA42] block mb-3 relative z-10">
                Reserve Charter
              </span>
              <h3 className="font-serif text-3xl font-semibold text-[#FFF9F2] mb-6 pb-6 border-b border-white/10 relative z-10 leading-tight">
                {tour.title || tour.name}
              </h3>

              <div className="space-y-6 mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#DDAA42]">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#A6978A] font-bold mb-0.5">Expedition Duration</p>
                    <p className="text-sm font-medium text-white">{tour.durationLabel || tour.duration || '7 Days'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#DDAA42]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#A6978A] font-bold mb-0.5">Group Formatting</p>
                    <p className="text-sm font-medium text-white">Private or Selected Pods</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 relative z-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#A6978A] block mb-1.5">Baseline Investment From</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#DDAA42]">
                    ${(tour.priceFromUSD || tour.price || 0).toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-[#D0C2B6]">USD / pax</span>
                </div>
              </div>

              <div className="flex flex-col gap-3.5 relative z-10">
                <button 
                  type="button" 
                  onClick={() => openBooking(tour.title || tour.name)}
                  className="w-full py-4 rounded-full bg-[#DDAA42] hover:bg-[#C89537] text-[#1A130F] font-bold text-[10px] tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(221,170,66,0.3)] hover:scale-105 cursor-pointer"
                >
                  Secure Expedition
                </button>
                <a 
                  href={waLink(`Hello Dinq! I am reviewing the "${tour.title || tour.name}" expedition itinerary and would like to consult on dates and private adaptations.`)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full bg-transparent hover:bg-white/10 border border-white/20 text-[#FFF9F2] font-bold text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  <span>Dispatch WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};