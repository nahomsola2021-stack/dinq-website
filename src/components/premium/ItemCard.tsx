// src/components/premium/ItemCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export interface ItemCardProps {
  id?: string;
  numeral?: string;
  name: string;
  kicker?: string;
  summary: string;
  italicNote?: string;
  tags?: string[];
  signature?: string;
  image: string;
  badge?: string;
  metaInfo?: string;
  linkTo?: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  numeral,
  name,
  kicker,
  summary,
  italicNote,
  tags,
  signature,
  image,
  badge,
  metaInfo,
  linkTo,
}) => {
  // Automatically wires up the card to the Tour Details page if an ID is provided
  const destinationUrl = linkTo || (id ? `/tours/${id}` : null);

  const CardWrapper = ({ children, className }: { children: React.ReactNode, className: string }) => {
    if (destinationUrl) {
      return <Link to={destinationUrl} className={className}>{children}</Link>;
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <CardWrapper className="group relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#1A130F] shadow-xl hover:shadow-[0_20px_50px_rgba(217,95,73,0.25)] transition-all duration-700 block border border-[#E7D0B8]/20 hover:border-[#D95F49]/60 flex flex-col justify-end">
      
      {/* Background Image with Slow Zoom */}
      <ImageWithFallback
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.07] transition-all duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      />
      
      {/* Cinematic Lighting Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-[#0E0A08]/60 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0A08]/50 via-transparent to-transparent opacity-100" />

      {/* Massive Numeral Watermark */}
      {numeral && (
        <div className="absolute top-6 right-6 font-serif text-[120px] leading-none text-white/5 group-hover:text-[#DDAA42]/20 transition-colors duration-700 pointer-events-none select-none">
          {numeral}
        </div>
      )}

      {/* Top Floating Meta & Badges */}
      <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-20">
        <div className="flex flex-col gap-2.5 items-start">
          {kicker && (
            <span className="bg-black/55 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-[#DDAA42] shadow-sm">
              {kicker}
            </span>
          )}
          {metaInfo && (
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-[#FFF9F2] shadow-sm flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#D95F49]" /> {metaInfo}
            </span>
          )}
        </div>

        {badge && (
          <span className="bg-[#D95F49] text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
            {badge}
          </span>
        )}
      </div>

      {/* Main Content Reveal Box */}
      <div className="relative z-20 p-5 sm:p-10 w-full">
        <div className="transform transition-transform duration-700 ease-out sm:translate-y-10 sm:group-hover:translate-y-0">
          
          <h3 className="font-serif text-3xl sm:text-4xl font-medium leading-[1.1] text-white drop-shadow-md group-hover:text-[#F5E9DA] transition-colors mb-3">
            {name}
          </h3>
          
          {/* Subtle line that expands on hover */}
          <div className="w-10 h-0.5 bg-[#DDAA42] group-hover:w-full transition-all duration-700 ease-out mb-5 opacity-50 group-hover:opacity-100" />

          <div className="overflow-hidden max-h-64 opacity-100 transition-all duration-[700ms] ease-in-out sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-64 sm:group-hover:opacity-100">
            <p className="line-clamp-3 sm:line-clamp-none text-[12px] sm:text-[13px] text-[#D0C2B6] font-light leading-[1.6] sm:leading-[1.7] mb-3 sm:mb-6">
              {summary}
            </p>

            {/* Micro Tags */}
            {tags && tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                {tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-[#A6978A] bg-black/40 border border-white/10 px-3 py-1.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Signature & Arrow Button */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              {signature ? (
                <span className="font-serif italic text-[13px] text-[#DDAA42]">"{signature}"</span>
              ) : italicNote ? (
                <span className="font-serif italic text-[13px] text-[#DDAA42]">"{italicNote}"</span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DDAA42]">View Complete Record</span>
              )}
              
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-[#D95F49] group-hover:border-[#D95F49] transition-colors shadow-lg">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </CardWrapper>
  );
};

// Advanced Asymmetrical Grid Layout (Adds vertical offsets to even items)
export const ItemGrid: React.FC<{ columns?: 2 | 3 | 4; children: React.ReactNode }> = ({ columns = 3, children }) => {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6 md:gap-8 [&>*:nth-child(even)]:md:translate-y-12 pb-12`}>
      {children}
    </div>
  );
};