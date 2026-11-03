import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, Calendar, Clock } from 'lucide-react';

export const TripFinder: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [interest, setInterest] = useState('');
  const [duration, setDuration] = useState('');
  const [month, setMonth] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('region', destination);
    if (interest) params.set('category', interest);
    if (duration) params.set('duration', duration);
    if (month) params.set('month', month);

    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div className="relative mx-auto -mt-10 sm:-mt-14 z-30 w-full max-w-6xl px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="rounded-lg bg-[#FFF9F2] p-4 sm:p-5 shadow-sm border border-[#E7D0B8]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49] flex items-center gap-1.5 mb-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>Destination Region</span>
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 px-3 py-2 text-xs sm:text-sm font-medium text-[#302019] focus:border-[#D95F49] focus:outline-none transition-colors"
            >
              <option value="">All Regions of Ethiopia</option>
              <option value="north">Northern Historic Circuit</option>
              <option value="mountains">Simien & Bale Mountains</option>
              <option value="rift">Great Rift Valley & Lakes</option>
              <option value="afar">Danakil Depression & Afar</option>
              <option value="south">South Omo Cultural Basin</option>
              <option value="shewa">Shewa Land & Capital Environs</option>
            </select>
          </div>

          {/* Interest */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49] flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Primary Experience</span>
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 px-3 py-2 text-xs sm:text-sm font-medium text-[#302019] focus:border-[#D95F49] focus:outline-none transition-colors"
            >
              <option value="">All Experiences</option>
              <option value="safari">Wildlife & Wilderness Safari</option>
              <option value="trekking">Alpine Mountain Trekking</option>
              <option value="birding">Endemic Birding Expeditions</option>
              <option value="festivals">Living Faith & Cultural Festivals</option>
              <option value="photography">Master Photography & Film</option>
              <option value="urban-camping">Urban Camping & Glamping</option>
              <option value="coffee">Wild Coffee Origins & Cupping</option>
            </select>
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49] flex items-center gap-1.5 mb-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Duration</span>
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 px-3 py-2 text-xs sm:text-sm font-medium text-[#302019] focus:border-[#D95F49] focus:outline-none transition-colors"
            >
              <option value="">Any Length</option>
              <option value="short">1–4 Days (Escapes & Stopovers)</option>
              <option value="classic">5–9 Days (Classic Circuits)</option>
              <option value="extended">10–15 Days (Comprehensive)</option>
              <option value="epic">16+ Days (National Odyssey)</option>
            </select>
          </div>

          {/* Month & Submit */}
          <div className="flex flex-col justify-end">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#D95F49] flex items-center gap-1.5 mb-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Preferred Travel Window</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-md border border-[#E7D0B8] bg-[#F5E9DA]/40 px-3 py-2 text-xs sm:text-sm font-medium text-[#302019] focus:border-[#D95F49] focus:outline-none transition-colors"
              >
                <option value="">Any Month</option>
                <option value="jan">January (Timkat / Genna)</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April (Fasika)</option>
                <option value="may">May</option>
                <option value="jun">June</option>
                <option value="jul">July (Chambalaalla)</option>
                <option value="aug">August (Ashenda)</option>
                <option value="sep">September (Meskel / Irreecha)</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December (Kulubi)</option>
              </select>

              <button
                type="submit"
                className="btn-terracotta !p-2 sm:!px-4 shrink-0 rounded-md cursor-pointer"
                aria-label="Find Expeditions"
              >
                <Search className="h-4 w-4" />
                <span className="hidden xl:inline text-xs font-semibold">Find</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
