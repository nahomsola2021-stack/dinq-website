import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { COLLECTIONS, CollectionLink } from '../../data/content/links';

interface ExploreMoreProps {
  currentId?: string;
  items?: CollectionLink[];
  title?: string;
  className?: string;
}

export const ExploreMore: React.FC<ExploreMoreProps> = ({
  currentId,
  items,
  title = 'Explore Other Collections',
  className = '',
}) => {
  // If items not provided, pick 4 collections excluding currentId
  const displayItems =
    items ||
    COLLECTIONS.filter((col) => col.id !== currentId).slice(0, 4);

  return (
    <div className={`my-20 ${className}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="eyebrow">Discover More</span>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#0E0D0B] dark:text-[#FAF7F2]">
            {title}
          </h3>
        </div>
        <Link
          to="/tours"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C88A2E] hover:text-[#D4AF7A] transition-colors"
        >
          <span>View All Circuits</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayItems.map((col) => (
          <Link
            key={col.id}
            to={col.route}
            className="reveal group relative flex flex-col justify-end overflow-hidden rounded-[24px] aspect-[3/4] bg-[#18181B] border border-white/10 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Background image */}
            <ImageWithFallback
              src={col.image}
              alt={col.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/50 to-transparent" />

            {/* Content overlay */}
            <div className="relative z-10 p-6 flex flex-col justify-end">
              {col.countBadge && (
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C88A2E] mb-1">
                  {col.countBadge}
                </span>
              )}
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF7F2] leading-tight group-hover:text-[#D4AF7A] transition-colors">
                {col.title}
              </h4>
              <p className="mt-2 text-xs text-[#E7E1D7]/80 line-clamp-2 font-light">
                {col.blurb}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#D4AF7A]">
                <span>Discover</span>
                <ArrowUpRight className="h-3.5 w-3.5 transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
