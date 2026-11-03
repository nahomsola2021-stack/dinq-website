import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RouteFlowProps {
  stops: string[];
  dark?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const RouteFlow: React.FC<RouteFlowProps> = ({
  stops,
  dark = false,
  size = 'md',
  className = '',
}) => {
  if (!stops || stops.length === 0) return null;

  const isSmall = size === 'sm';

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label="Route itinerary path"
    >
      {stops.map((stop, idx) => (
        <React.Fragment key={idx}>
          <div
            className={`flex items-center rounded-lg border font-medium ${
              isSmall ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm'
            } ${
              dark
                ? 'bg-[#18181B] border-white/10 text-[#FAF7F2]'
                : 'bg-white border-[#E7E1D7] text-[#0E0D0B] shadow-xs'
            }`}
          >
            <span>{stop}</span>
          </div>
          {idx < stops.length - 1 && (
            <ArrowRight
              className={`shrink-0 ${
                isSmall ? 'h-3 w-3' : 'h-3.5 w-3.5'
              } text-[#C88A2E]`}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
