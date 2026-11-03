// src/pages/Destinations.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, X } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
import { PageHero } from '../components/premium/PageHero';
import { ExploreMore } from '../components/premium/ExploreMore';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { DESTINATIONS_DATA } from '../data/content/destinations';
import { updatePageMeta } from '../lib/seo';
import { useBooking } from '../context/BookingContext';

export const Destinations: React.FC = () => {
  const { openBooking } = useBooking();
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  
  // Hybrid CMS data starts using pre-hardcoded atlas data
  const [liveDestinations, setLiveDestinations] = useState<any[]>(DESTINATIONS_DATA);

  useEffect(() => {
    updatePageMeta(
      'Key Destinations of Ethiopia — Dinq Tour, Travel & Events',
      'Explore 11 iconic Ethiopian destinations: Lalibela, Simien Mountains, Gondar, Axum, Danakil Depression, Bale, Harar Jugol, and the South Omo Valley.',
      '/destinations'
    );
  }, []);

  // Hydrates edits directly from Firebase if present
  useEffect(() => {
    const fetchDashboardEdits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'destinations'));
        const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));

        setLiveDestinations(prevStatic => {
          let merged = [...prevStatic];
          dbData.forEach(dbItem => {
            const existingIdx = merged.findIndex(d => d.id === dbItem.slug || d.id === dbItem.id);
            if (existingIdx > -1) {
              merged[existingIdx] = { 
                ...merged[existingIdx], 
                name: dbItem.name || merged[existingIdx].name,
                image: dbItem.image || dbItem.coverImage || merged[existingIdx].image,
                summary: dbItem.description || dbItem.summary || merged[existingIdx].summary,
                status: dbItem.status || 'Active'
              };
            } else {
              merged.push(dbItem as any);
            }
          });
          return merged.filter(d => d.status !== 'Draft');
        });
      } catch (error) {
        console.error("Firebase Sync Error on Destinations:", error);
      }
    };
    fetchDashboardEdits();
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All 11 Atlas Destinations' },
    { id: 'north', label: 'Northern Historic Sector' },
    { id: 'mountains', label: 'Alpine Highlands' },
    { id: 'rift-desert', label: 'Rift Valley & deserts' },
    { id: 'south-omo', label: 'South Omo Cultures' },
  ];

  const filteredDestinations = useMemo(() => {
    return liveDestinations.filter((dest) => {
      if (filterRegion !== 'all' && dest.regionCategory !== filterRegion) return false;
      if (search) {
        const query = search.toLowerCase();
        const matchName = dest.name.toLowerCase().includes(query);
        const matchSummary = dest.summary.toLowerCase().includes(query);
        const matchSignature = dest.signature?.toLowerCase().includes(query);
        if (!matchName && !matchSummary && !matchSignature) return false;
      }
      return true;
    });
  }, [liveDestinations, filterRegion, search]);

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      <PageHero
        image="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_2400/v1789938241/n79pjzdjboazxhpumypb.jpg"
        imageAlt="Gondar's historic Fasil Ghebbi royal enclosure in Ethiopia"
        eyebrow="Geographic Wonder"
        Icon={MapPin}
        title="11 Legendary"
        titleItalic="Destinations"
        subtitle="From the precipitous heights of the Simien Massif to the subterranean monolithic stone churches of Lalibela and the ancient living tribes of the Omo River."
        crumbs={[{ label: 'Destinations' }]}
        tall={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30 pb-20">
        
        {/* Luxury Filter Toolbar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-2 sm:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E7D0B8]/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = filterRegion === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterRegion(tab.id)}
                    className={`whitespace-nowrap text-xs sm:text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#302019] text-[#FFF9F2] shadow-md' 
                        : 'bg-transparent text-[#78685E] hover:bg-[#F5E9DA] hover:text-[#302019]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[240px] md:min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78685E]/60" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 rounded-full border-none bg-[#FAF4EB]/80 text-xs sm:text-[13px] text-[#302019] font-medium focus:ring-2 focus:ring-[#DDAA42]/30 focus:bg-white placeholder:text-[#78685E]/50 transition-all outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#E7D0B8]/40 flex items-center justify-center text-[#78685E] hover:bg-[#DDAA42] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 masonry-grid-layout text-left">
            {filteredDestinations.map((dest, index) => {
              const isHeroCard = index === 0;
              
              return (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  className={`block group relative overflow-hidden rounded-[28px] bg-[#1A130F] cursor-pointer transition-all duration-700 hover:shadow-2xl ${
                    isHeroCard ? 'md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]' : 'min-h-[350px] md:min-h-[400px]'
                  }`}
                >
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04] opacity-90 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-[#FFF9F2] z-10">
                    <div className="transform transition-transform duration-500 ease-out translate-y-0 sm:translate-y-4 group-hover:translate-y-0 space-y-3">
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#DDAA42]">
                          Index {dest.numeral || `0${index + 1}`}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-[#D95F49]" />
                        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#A6978A]">
                          {dest.regionCategoryLabel}
                        </span>
                      </div>

                      <h3 className={`font-serif font-medium leading-[1.1] ${isHeroCard ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl'}`}>
                        {dest.name}
                      </h3>
                      
                      <div className="overflow-hidden sm:max-h-0 sm:opacity-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:max-h-24 group-hover:opacity-100">
                        <p className="text-[13px] text-[#E7D0B8]/85 font-light leading-relaxed">
                          {dest.summary}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#D95F49] transition-colors group-hover:text-[#DDAA42]">
                        <span>Secure Expedition Access</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="my-16 rounded-[24px] border border-[#E7D0B8]/50 bg-white/50 backdrop-blur-sm p-12 text-center max-w-xl mx-auto shadow-sm space-y-6">
            <MapPin className="h-12 w-12 text-[#D95F49] mx-auto opacity-50" />
            <h3 className="font-serif text-3xl font-semibold text-[#302019]">
              Atlas Path Obscured
            </h3>
            <p className="text-sm text-[#78685E] font-light leading-relaxed">
              We couldn't locate any dynamic map points matching your search phrase. Switch categories or check your search criteria.
            </p>
            <button
              onClick={() => {
                setFilterRegion('all');
                setSearch('');
              }}
              className="px-6 py-3 rounded-full bg-[#302019] hover:bg-[#D95F49] text-white font-bold text-[10px] tracking-widest uppercase transition-colors shadow-md cursor-pointer"
            >
              Reset Regional View
            </button>
          </div>
        )}

        <div className="mt-24">
          <ExploreMore title="Explore Related Expeditions & Circuits" />
        </div>
        <div className="mt-12">
          <CTABand />
        </div>
      </div>
    </div>
  );
};