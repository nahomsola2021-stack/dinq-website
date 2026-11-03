// src/pages/Tours.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, Filter, X, LayoutList, LayoutGrid, RotateCcw, Compass,
  MessageCircle, Check, MapPin, ChevronLeft, ChevronRight, ChevronDown,
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
import { PageHero } from '../components/premium/PageHero';
import { TourCard } from '../components/tours/TourCard';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { TOURS_DATA, TourItem } from '../data/content/tours';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';
import { useBooking } from '../context/BookingContext';

const ITEMS_PER_PAGE = 4;

export const Tours: React.FC = () => {
  const { openBooking } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // --- HYBRID CMS STATE (Starts with your hardcoded data) ---
  const [liveTours, setLiveTours] = useState<TourItem[]>(TOURS_DATA);

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedCircuit, setSelectedCircuit] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeModalTour, setActiveModalTour] = useState<TourItem | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updatePageMeta(
      'Curated Expeditions & Tours — Dinq Tour, Travel & Events',
      'Discover 15 editorial Ethiopian expeditions across the historic northern circuit, Simien mountain ridges, Bale wolf safaris, and living Omo cultures.',
      '/tours'
    );
  }, []);

  // --- OVERRIDE WITH FIREBASE DASHBOARD EDITS ---
  // --- OVERRIDE WITH FIREBASE DASHBOARD EDITS ---
  useEffect(() => {
    const fetchDashboardEdits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tours'));
        // ADDED 'as any' to fix TypeScript strict mode errors
        const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));

        setLiveTours(prevStaticTours => {
          let merged = [...prevStaticTours];
          
          dbData.forEach(dbTour => {
            const existingIdx = merged.findIndex(t => t.id === dbTour.slug || t.id === dbTour.id);
            
            if (existingIdx > -1) {
              merged[existingIdx] = { 
                ...merged[existingIdx], 
                ...dbTour, 
                priceFromUSD: Number(dbTour.price || dbTour.priceFromUSD) || merged[existingIdx].priceFromUSD 
              };
            } else {
              merged.push({
                ...dbTour,
                priceFromUSD: Number(dbTour.price),
                durationDays: parseInt(String(dbTour.duration || '7').match(/\d+/)?.[0] || '7', 10),
                numeral: `0${merged.length + 1}`.slice(-2),
                highlights: dbTour.highlights || []
              } as any);
            }
          });
          
          return merged.filter(t => (t as any).status !== 'Draft');
        });
      } catch (error) {
        console.error("Firebase Sync Error:", error);
      }
    };
    fetchDashboardEdits();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search, selectedDifficulties, selectedDuration, selectedCircuit]);

  const categoryTabs = [
    { id: 'All', label: 'All Expeditions' },
    { id: 'History', label: 'Historic Circuit' },
    { id: 'Trekking', label: 'Alpine Trekking' },
    { id: 'Wildlife', label: 'Wildlife Safaris' },
    { id: 'Culture', label: 'Living Cultures' },
    { id: 'Festival', label: 'Festivals of Faith' },
    { id: 'Adventure', label: 'Desert & Wilderness' },
  ];

  const difficultyOptions = ['Easy', 'Moderate', 'Challenging', 'Strenuous'];

  const circuitOptions = [
    { id: 'all', label: 'All Regions' },
    { id: 'north', label: 'Northern Historic Circuit' },
    { id: 'mountains', label: 'Simien & Bale Mountains' },
    { id: 'south', label: 'South Omo Valley' },
    { id: 'east', label: 'Eastern Harar & Afar' },
    { id: 'safari', label: 'National Wildlife Parks' },
    { id: 'shewa', label: 'Shewa & Capital Environs' },
  ];

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearch('');
    setSelectedDifficulties([]);
    setSelectedDuration('all');
    setSelectedCircuit('all');
    setSearchParams({});
  };

  const hasActiveFilters =
    activeCategory !== 'All' ||
    search !== '' ||
    selectedDifficulties.length > 0 ||
    selectedDuration !== 'all' ||
    selectedCircuit !== 'all';

  const filteredTours = useMemo(() => {
    return liveTours.filter((tour) => {
      if (activeCategory !== 'All' && tour.category !== activeCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = tour.title.toLowerCase().includes(q);
        const matchDest = tour.destination.toLowerCase().includes(q);
        if (!matchTitle && !matchDest) return false;
      }
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(tour.difficulty)) return false;
      if (selectedDuration !== 'all') {
        if (selectedDuration === 'short' && tour.durationDays > 5) return false;
        if (selectedDuration === 'medium' && (tour.durationDays < 6 || tour.durationDays > 10)) return false;
        if (selectedDuration === 'long' && tour.durationDays < 11) return false;
      }
      if (selectedCircuit !== 'all' && tour.circuit !== selectedCircuit) return false;
      return true;
    });
  }, [liveTours, activeCategory, search, selectedDifficulties, selectedDuration, selectedCircuit]);

  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const currentTours = filteredTours.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listTopRef.current) {
      const y = listTopRef.current.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#F5E9DA] text-[#302019] min-h-screen">
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1788191639/ja0p18egwk32gflxlq5k.jpg"
        imageAlt="Ethiopia's historic northern circuit and Simien Mountains"
        eyebrow="Curated Catalogue"
        Icon={Compass}
        title="Curated Tours &"
        titleItalic="Expeditions"
        subtitle="Fifteen small-group and private journeys through ancient monolithic civilizations, alpine ridges, and pristine African wilderness."
        crumbs={[{ label: 'Tours' }]}
        tall={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10" ref={listTopRef}>
        
        <div className="mb-10 overflow-x-auto no-scrollbar pb-2">
          <nav className="flex items-center gap-3 min-w-max">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`whitespace-nowrap text-xs sm:text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === tab.id
                    ? 'bg-[#302019] text-[#FFF9F2] shadow-md'
                    : 'bg-white/50 border border-[#E7D0B8]/60 text-[#78685E] hover:bg-white hover:border-[#DDAA42]/50 hover:text-[#302019]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#E7D0B8]/60">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78685E]/70" />
            <input
              type="text"
              placeholder="Search by destination, park, or experience..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full border border-[#E7D0B8]/80 bg-white shadow-sm text-xs sm:text-[13px] text-[#302019] placeholder-[#78685E]/50 focus:outline-none focus:border-[#DDAA42] focus:ring-1 focus:ring-[#DDAA42] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[#F5E9DA] flex items-center justify-center text-[#78685E] hover:bg-[#D95F49] hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-5">
            <span className="text-xs sm:text-[13px] text-[#78685E] tracking-wide">
              Showing <strong className="font-serif text-lg font-medium text-[#302019] mx-1">{filteredTours.length}</strong> Expeditions
            </span>
            <div className="hidden lg:flex items-center rounded-full border border-[#E7D0B8] bg-white p-1 shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-[#302019] text-[#FFF9F2]' : 'text-[#78685E] hover:text-[#302019]'}`}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode('horizontal')} className={`p-2 rounded-full transition-colors ${viewMode === 'horizontal' ? 'bg-[#302019] text-[#FFF9F2]' : 'text-[#78685E] hover:text-[#302019]'}`}>
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D95F49] bg-white text-xs font-semibold text-[#D95F49] shadow-sm"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <aside className={`lg:col-span-3 rounded-[2rem] bg-white border border-[#E7D0B8]/50 p-8 shadow-[0_8px_30px_rgb(221,170,66,0.06)] ${mobileFilterOpen ? 'block mb-8' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between pb-6 border-b border-[#E7D0B8]/60">
              <h3 className="font-serif text-2xl font-medium text-[#302019]">Refine</h3>
              {hasActiveFilters && (
                <button onClick={handleResetFilters} className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D95F49] hover:text-[#B54531] transition-colors group">
                  <RotateCcw className="h-3 w-3 group-hover:-rotate-90 transition-transform duration-300" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="py-7 border-b border-[#E7D0B8]/60">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A] mb-4">Destination Region</label>
              <div className="relative group cursor-pointer">
                <select value={selectedCircuit} onChange={(e) => setSelectedCircuit(e.target.value)} className="w-full appearance-none pl-4 pr-10 py-3.5 rounded-xl border border-[#E7D0B8]/80 bg-[#FAF4EB] text-[13px] font-medium text-[#302019] focus:outline-none focus:border-[#DDAA42] focus:ring-1 focus:ring-[#DDAA42] transition-all cursor-pointer group-hover:border-[#DDAA42]/50 shadow-sm">
                  {circuitOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A6978A] group-hover:text-[#DDAA42] transition-colors"><ChevronDown className="h-4 w-4" /></div>
              </div>
            </div>

            <div className="py-7 border-b border-[#E7D0B8]/60">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A] mb-5">Duration</label>
              <div className="space-y-4">
                {[{ id: 'all', label: 'Any Duration' }, { id: 'short', label: '1–5 Days (Escapes)' }, { id: 'medium', label: '6–10 Days (Classic)' }, { id: 'long', label: '11+ Days (Grand Circuits)' }].map(d => (
                  <label key={d.id} className="flex items-center gap-3.5 text-[13px] font-medium text-[#78685E] cursor-pointer hover:text-[#302019] transition-colors group">
                    <div className="relative flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full border transition-all duration-300 ${selectedDuration === d.id ? 'border-[#302019]' : 'border-[#E7D0B8] group-hover:border-[#DDAA42]'}`} />
                      <div className={`absolute w-2.5 h-2.5 rounded-full bg-[#DDAA42] transition-all duration-300 ${selectedDuration === d.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                    </div>
                    <span className={`${selectedDuration === d.id ? 'text-[#302019]' : ''}`}>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="py-7">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6978A] mb-5">Physical Difficulty</label>
              <div className="space-y-4">
                {difficultyOptions.map(diff => (
                  <label key={diff} className="flex items-center gap-3.5 text-[13px] font-medium text-[#78685E] cursor-pointer hover:text-[#302019] transition-colors group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${selectedDifficulties.includes(diff) ? 'bg-[#302019] border-[#302019]' : 'border-[#E7D0B8] bg-transparent group-hover:border-[#DDAA42]'}`}>
                      {selectedDifficulties.includes(diff) && <Check className="w-3.5 h-3.5 text-[#DDAA42]" />}
                    </div>
                    <span className={`${selectedDifficulties.includes(diff) ? 'text-[#302019]' : ''}`}>{diff}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-2 border-t border-[#E7D0B8]/60">
              <a href={waLink('Hello Dinq! I would like to consult with an expedition planner about curating a custom tour.')} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#FAF4EB] border border-[#E7D0B8] text-xs font-bold uppercase tracking-wider text-[#302019] hover:bg-white hover:border-[#DDAA42] hover:text-[#DDAA42] transition-all shadow-sm hover:shadow-md group">
                <MessageCircle className="h-4 w-4 text-[#DDAA42] group-hover:scale-110 transition-transform" />
                <span>Custom Itinerary</span>
              </a>
            </div>
          </aside>

          <main className="lg:col-span-9 flex flex-col min-h-full">
            {currentTours.length > 0 ? (
              <>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8' : 'space-y-6 lg:space-y-8'}>
                  {currentTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} layout={viewMode} onQuickView={(t) => setActiveModalTour(t)} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-16 pt-8 flex items-center justify-between sm:justify-center gap-3 sm:gap-4 border-t border-[#E7D0B8]/60">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#E7D0B8] flex items-center justify-center text-[#78685E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#302019] hover:text-[#FFF9F2] hover:border-[#302019] transition-all shadow-sm"><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full text-sm sm:text-base font-medium font-serif transition-all ${currentPage === i + 1 ? 'bg-[#302019] text-[#DDAA42] shadow-md border border-[#302019]' : 'text-[#78685E] border border-transparent hover:bg-white hover:border-[#E7D0B8] hover:text-[#302019]'}`}>{i + 1}</button>
                      ))}
                    </div>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#E7D0B8] flex items-center justify-center text-[#78685E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#302019] hover:text-[#FFF9F2] hover:border-[#302019] transition-all shadow-sm"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-[24px] bg-white border border-[#E7D0B8]/60 p-12 sm:p-16 text-center max-w-2xl mx-auto shadow-sm w-full">
                <div className="h-16 w-16 bg-[#FAF4EB] rounded-full flex items-center justify-center mx-auto mb-6"><Compass className="h-8 w-8 text-[#D95F49]" /></div>
                <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#302019]">No Expeditions Found</h4>
                <p className="mt-4 text-[13px] text-[#78685E] font-light leading-relaxed max-w-md mx-auto">We could not find an expedition matching your exact filters. Try clearing your criteria or reach out to design a custom journey.</p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button type="button" onClick={handleResetFilters} className="px-6 py-3 rounded-full bg-[#302019] text-[#DDAA42] font-bold text-[10px] tracking-widest uppercase hover:bg-[#1C120C] transition-colors shadow-md">Reset All Filters</button>
                </div>
              </div>
            )}
          </main>
        </div>

        <ExploreMore title="Explore Related Collections" className="mt-24" />
        <div className="mt-16"><CTABand /></div>
      </div>

      {activeModalTour && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1713]/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-lg bg-[#FFF9F2] p-6 sm:p-8 text-[#302019] shadow-xl border border-[#E7D0B8] my-8">
            <button onClick={() => setActiveModalTour(null)} className="absolute top-5 right-5 h-8 w-8 rounded-full bg-[#FAF4EB] border border-[#E7D0B8] flex items-center justify-center text-[#78685E] hover:text-[#302019] transition-colors z-10"><X className="h-4 w-4" /></button>
            <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-5 bg-[#302019]">
              <ImageWithFallback src={activeModalTour.image} alt={activeModalTour.title} className="h-full w-full object-cover" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#302019] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">{activeModalTour.categoryLabel}</div>
              <div className="absolute bottom-3 left-3 text-xs font-semibold bg-[#302019]/85 text-[#FFF9F2] px-3 py-1 rounded-sm">{activeModalTour.durationLabel} · {activeModalTour.difficulty}</div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D95F49]">{activeModalTour.metaSummary}</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] mt-1 leading-snug">{activeModalTour.title}</h3>
            <p className="text-xs text-[#78685E] mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#D95F49]" /><span>{activeModalTour.destination}</span></p>
            <p className="mt-3 text-sm text-[#78685E] font-light leading-relaxed">{activeModalTour.summary}</p>
            
            <div className="mt-6 pt-5 border-t border-[#E7D0B8] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase text-[#78685E] block leading-none">Starting from</span>
                <span className="font-serif text-2xl font-bold text-[#302019]">${activeModalTour.priceFromUSD.toLocaleString()} <span className="text-xs font-normal text-[#78685E]">USD / person</span></span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link to={`/tours/${activeModalTour.id}`} className="px-5 py-2.5 rounded border border-[#302019] text-[#302019] text-xs font-semibold hover:bg-[#302019] hover:text-[#FFF9F2] transition-colors">
                  View Full Itinerary
                </Link>
                <button type="button" onClick={() => { const title = activeModalTour.title; setActiveModalTour(null); openBooking(title); }} className="btn-terracotta !py-2.5 !px-5 text-xs font-semibold cursor-pointer shadow-sm">
                  <span>Book This Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};