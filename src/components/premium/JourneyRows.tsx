import React from 'react';
import { RouteFlow } from './RouteFlow';

export interface JourneyRowItem {
  id: string;
  numeral: string;
  name: string;
  tagline: string;
  duration?: string;
  routeStops: string[];
  themes: string[];
  summary?: string;
}

interface JourneyRowsProps {
  items: JourneyRowItem[];
  dark?: boolean;
  className?: string;
}

export const JourneyRows: React.FC<JourneyRowsProps> = ({
  items,
  dark = true,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`reveal rounded-[24px] border p-6 sm:p-8 transition-colors ${
            dark
              ? 'bg-[#18181B] border-white/10 hover:border-[#C88A2E]/50'
              : 'bg-white border-[#E7E1D7] hover:border-[#C88A2E]/50 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Numeral + Name + Tagline */}
            <div className="lg:col-span-5 flex items-start gap-4">
              <span className={`numeral ${dark ? 'numeral-dark' : 'numeral-light'} shrink-0 text-3xl sm:text-4xl`}>
                {item.numeral}
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">
                    {item.name}
                  </h4>
                  {item.duration && (
                    <span className="text-[11px] font-semibold tracking-wider uppercase bg-[#C88A2E]/20 text-[#D4AF7A] px-2.5 py-0.5 rounded-full">
                      {item.duration}
                    </span>
                  )}
                </div>
                <p className={`mt-1 text-xs sm:text-sm font-light ${dark ? 'text-[#E7E1D7]/70' : 'text-[#52525B]'}`}>
                  {item.tagline}
                </p>
                {item.summary && (
                  <p className={`mt-2 text-xs leading-relaxed ${dark ? 'text-[#E7E1D7]/60' : 'text-[#71717A]'}`}>
                    {item.summary}
                  </p>
                )}
              </div>
            </div>

            {/* Right: RouteFlow + Themes */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
              <RouteFlow stops={item.routeStops} dark={dark} size="sm" />
              {item.themes && item.themes.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8A7D70]">
                  <span className="text-[#C88A2E] font-medium">Themes:</span>
                  {item.themes.map((theme, idx) => (
                    <React.Fragment key={idx}>
                      <span className={dark ? 'text-[#D4AF7A]' : 'text-[#18181B]'}>
                        {theme}
                      </span>
                      {idx < item.themes.length - 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
