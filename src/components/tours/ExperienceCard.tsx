import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Mountain, Users, Star, Eye } from 'lucide-react';
import { ImageWithFallback } from '../premium/ImageWithFallback';
import type { TourItem } from '../../data/content/tours';

/** Optional editorial fields. Add them to TOURS_DATA when ready; the card degrades gracefully without them. */
export type ExperienceTour = TourItem & {
  status?: string;    // "Few places left", "Private access"
  groupSize?: string; // "Up to 8"
  rating?: number;    // 4.9
};

interface CardProps {
  tour: ExperienceTour;
  to?: string;
  size?: 'tall' | 'standard';
  onQuickView?: (t: TourItem) => void;
  className?: string;
}

export const ExperienceCard: React.FC<CardProps> = ({ tour, to, size = 'standard', onQuickView, className = '' }) => {
  const href = to ?? `/tours/${tour.id}`;
  const tall = size === 'tall';

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#14100D] text-[#F6EDE0]
        transition-all duration-500 ease-out will-change-transform
        hover:-translate-y-1.5 hover:border-[#B98A4E]/60 hover:shadow-[0_40px_90px_-35px_rgba(185,138,78,0.55)]
        focus-within:border-[#E9D3A6] ${tall ? 'min-h-[560px] lg:min-h-[640px]' : 'min-h-[460px]'} ${className}`}
    >
      {/* Stretched link keeps the whole surface clickable without nesting the quick-view button inside an anchor */}
      <Link to={href} className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline-none" aria-label={`${tour.title}, from $${tour.priceFromUSD.toLocaleString()}`} />

      <ImageWithFallback
        src={tour.image}
        alt={tour.title}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      {/* Scrim: darkens further on hover so the revealed summary stays legible */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#14100D] via-[#14100D]/55 to-[#14100D]/5 transition-opacity duration-500" />
      <div className="absolute inset-0 -z-10 bg-[#14100D]/0 transition-colors duration-500 group-hover:bg-[#14100D]/25" />

      {/* Top row: glass tags */}
      <div className="relative z-20 flex items-start justify-between gap-3 p-5 pointer-events-none">
        <div className="flex flex-wrap gap-2">
          {tour.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4684F]/40 bg-[#E4684F]/20 px-3 py-1 text-xs font-medium text-[#FFD9CF] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4684F]" />
              {tour.status}
            </span>
          )}
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-[#F6EDE0] backdrop-blur-md">
            {tour.categoryLabel}
          </span>
        </div>
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(tour)}
            aria-label={`Quick view ${tour.title}`}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-[#F6EDE0] opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-[#E9D3A6] hover:text-[#14100D] focus-visible:opacity-100 group-hover:opacity-100 max-lg:opacity-100"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Bottom: story + price */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
        <div className="px-6 pb-5 sm:px-7">
          <p className="text-sm text-[#E9D3A6]">{tour.destination}</p>
          <h3 className={`mt-1.5 font-serif font-medium leading-[1.05] tracking-[-0.02em] text-balance ${tall ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[1.7rem]'}`}>
            {tour.title}
          </h3>

          {/* Summary unfurls on hover/focus; always visible on touch */}
          <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
            <p className="overflow-hidden text-sm leading-relaxed text-[#E7D0B8]/85">
              <span className="mt-3 block line-clamp-3 max-w-md">{tour.summary}</span>
            </p>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <span className="block text-xs text-[#E7D0B8]/70">From</span>
              <span className="font-serif text-3xl font-semibold leading-none tracking-tight text-[#F6EDE0]">
                ${tour.priceFromUSD.toLocaleString()}
              </span>
              <span className="ml-1.5 text-xs text-[#E7D0B8]/60">per person</span>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[#E9D3A6]/40 text-[#E9D3A6] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#E9D3A6] group-hover:bg-[#E9D3A6] group-hover:text-[#14100D]">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>

        {/* Metadata footer */}
        <div className="flex items-center gap-x-5 gap-y-1 overflow-x-auto whitespace-nowrap border-t border-white/10 bg-black/30 px-6 py-3.5 text-xs text-[#E7D0B8] backdrop-blur-md sm:px-7 no-scrollbar">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#B98A4E]" />{tour.durationLabel}</span>
          <span className="inline-flex items-center gap-1.5"><Mountain className="h-3.5 w-3.5 text-[#B98A4E]" />{tour.difficulty}</span>
          {tour.groupSize && <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#B98A4E]" />{tour.groupSize}</span>}
          {tour.rating && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-[#E9D3A6]">
              <Star className="h-3.5 w-3.5 fill-current" />{tour.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/**
 * Staggered editorial grid: one dominant card, one dropped neighbour, one offset below.
 * Reads like a magazine spread rather than a row of equal tiles.
 */
const LAYOUT = [
  { span: 'lg:col-span-7', size: 'tall' as const },
  { span: 'lg:col-span-5 lg:mt-24', size: 'tall' as const },
  { span: 'lg:col-span-6 lg:col-start-4 lg:-mt-8', size: 'standard' as const },
];

export const ExperienceGrid: React.FC<{ tours: ExperienceTour[]; onQuickView?: (t: TourItem) => void }> = ({ tours, onQuickView }) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
    {tours.slice(0, LAYOUT.length).map((t, i) => (
      <ExperienceCard key={t.id} tour={t} size={LAYOUT[i].size} className={LAYOUT[i].span} onQuickView={onQuickView} />
    ))}
  </div>
);
