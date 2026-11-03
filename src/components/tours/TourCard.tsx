import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { ImageWithFallback } from '../premium/ImageWithFallback';
import { TourItem } from '../../data/content/tours';
import { waLink } from '../../lib/whatsapp';
import { useBooking } from '../../context/BookingContext';

export interface TourCardProps {
  tour: TourItem;
  onQuickView?: (tour: TourItem) => void;
  layout?: 'horizontal' | 'grid';
  className?: string;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onQuickView,
  layout = 'horizontal',
  className = '',
}) => {
  const { openBooking } = useBooking();
  const enquiryLink = waLink(`Hello Dinq! I would like to inquire about the "${tour.title}" expedition.`);

  if (layout === 'grid') {
    return (
      <article
        className={`card-editorial group flex flex-col justify-between overflow-hidden rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] transition-all duration-300 hover:border-[#D95F49] hover:shadow-[0_6px_20px_rgba(48,32,25,0.06)] ${className}`}
      >
        {/* Top Image - Now a Link */}
        <Link to={`/tours/${tour.id}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-[#302019]">
          <ImageWithFallback
            src={tour.image}
            alt={tour.title}
            className="card-image h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Label */}
          <div className="absolute top-3.5 left-3.5 bg-[#FFF9F2]/95 text-[#302019] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm border border-[#E7D0B8] shadow-2xs">
            {tour.categoryLabel}
          </div>

          {/* Difficulty Badge */}
          {tour.difficulty && (
            <div className="absolute top-3.5 right-3.5 bg-[#302019]/80 text-[#FFF9F2] text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm">
              {tour.difficulty}
            </div>
          )}

          {/* Spots Left Pill */}
          {tour.departureSpotsLeft && tour.departureSpotsLeft <= 4 && (
            <div className="absolute bottom-3 left-3.5 text-[9px] font-bold tracking-wider uppercase bg-[#D95F49] text-white px-2 py-0.5 rounded-sm">
              {tour.departureSpotsLeft} Spots Left
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78685E]">
                {tour.metaSummary}
              </span>
              <div className="text-right">
                <span className="text-[10px] text-[#78685E] block leading-none">From</span>
                <span className="font-serif text-lg font-bold text-[#302019]">
                  ${tour.priceFromUSD.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Title - Now a Link */}
            <Link to={`/tours/${tour.id}`}>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#302019] leading-snug group-hover:text-[#D95F49] transition-colors">
                {tour.title}
              </h3>
            </Link>

            <p className="mt-2.5 text-xs sm:text-sm text-[#78685E] font-light leading-relaxed line-clamp-3">
              {tour.summary}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E7D0B8]/70 flex items-center justify-between">
            <Link
              to={`/tours/${tour.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D95F49] hover:text-[#B54531] transition-colors group/link cursor-pointer"
            >
              <span>View Itinerary</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-3">
              {onQuickView && (
                <button
                  type="button"
                  onClick={() => onQuickView(tour)}
                  className="text-[11px] font-medium uppercase tracking-wider text-[#78685E] hover:text-[#302019] transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              )}
              <a
                href={enquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Inquire about ${tour.title} on WhatsApp`}
                className="h-7 w-7 rounded-full bg-[#F5E9DA]/60 border border-[#E7D0B8] text-[#302019] flex items-center justify-center hover:bg-[#D95F49] hover:border-[#D95F49] hover:text-white transition-colors"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Master Horizontal Layout (Desktop default based on reference screenshot)
  return (
    <article
      className={`card-editorial group flex flex-col md:flex-row overflow-hidden rounded-lg bg-[#FFF9F2] border border-[#E7D0B8] transition-all duration-300 hover:border-[#D95F49] hover:shadow-[0_6px_22px_rgba(48,32,25,0.06)] ${className}`}
    >
      {/* Left Section — Destination Image (~40% width) - Now a Link */}
      <Link to={`/tours/${tour.id}`} className="block relative w-full md:w-[40%] min-h-[220px] md:min-h-[280px] overflow-hidden bg-[#302019] shrink-0">
        <ImageWithFallback
          src={tour.image}
          alt={tour.title}
          className="card-image h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />

        {/* Category Label (Upper Left) */}
        <div className="absolute top-4 left-4 bg-[#FFF9F2]/95 text-[#302019] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm border border-[#E7D0B8] shadow-2xs backdrop-blur-xs">
          {tour.categoryLabel}
        </div>

        {/* Difficulty Badge */}
        {tour.difficulty && (
          <div className="absolute top-4 right-4 bg-[#302019]/80 text-[#FFF9F2] text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-sm backdrop-blur-xs">
            {tour.difficulty}
          </div>
        )}

        {/* Spots Left Pill (if limited) */}
        {tour.departureSpotsLeft && tour.departureSpotsLeft <= 4 && (
          <div className="absolute bottom-4 left-4 text-[9px] font-bold tracking-wider uppercase bg-[#D95F49] text-white px-2.5 py-0.5 rounded-sm shadow-xs">
            {tour.departureSpotsLeft} Spots Left
          </div>
        )}
      </Link>

      {/* Right Section — Tour Information (~60% width) */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-8 bg-[#FFF9F2]">
        <div>
          {/* Header row: Metadata & Prominent Price */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#78685E]">
              <span>{tour.metaSummary}</span>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase tracking-wider text-[#78685E] block leading-tight">
                Starting from
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#302019]">
                ${tour.priceFromUSD.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#78685E]">USD</span>
              </span>
            </div>
          </div>

          {/* Tour Title - Now a Link */}
          <Link to={`/tours/${tour.id}`}>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#302019] leading-tight group-hover:text-[#D95F49] transition-colors mt-1">
              {tour.title}
            </h3>
          </Link>

          {/* Concise 12-25 word summary */}
          <p className="mt-3 text-sm text-[#78685E] font-light leading-relaxed">
            {tour.summary}
          </p>

          {/* Subtle Key Highlights Strip */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#E7D0B8]/60 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#78685E]">
              {tour.highlights.slice(0, 3).map((h, idx) => (
                <React.Fragment key={idx}>
                  <span className="line-clamp-1">{h}</span>
                  {idx < 2 && <span className="text-[#D95F49]/50 font-bold">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Footer Row: Explore Link, Direct Booking & WhatsApp Consultation */}
        <div className="mt-6 pt-5 border-t border-[#E7D0B8]/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            
            {/* Main Action - Route to Details */}
            <Link
              to={`/tours/${tour.id}`}
              className="btn-terracotta !py-2 !px-5 text-xs font-semibold cursor-pointer shadow-sm"
            >
              <span>View Full Itinerary</span>
            </Link>

            {/* Secondary Action - Booking Modal */}
            <button
              type="button"
              onClick={() => openBooking(tour.title)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#302019] hover:text-[#D95F49] transition-colors group/cta cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Dates</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {onQuickView && (
              <button
                type="button"
                onClick={() => onQuickView(tour)}
                className="hidden md:block text-[11px] font-medium uppercase tracking-wider text-[#78685E] hover:text-[#302019] transition-colors cursor-pointer"
              >
                Quick View
              </button>
            )}
            <a
              href={enquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Inquire about ${tour.title} via WhatsApp`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#78685E] hover:text-[#D95F49] transition-colors py-1 px-2.5 rounded-md hover:bg-[#F5E9DA]/50"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};