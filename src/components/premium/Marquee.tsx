import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: 'normal' | 'slow';
  dark?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 'normal',
  dark = true,
  className = '',
}) => {
  return (
    <div
      className={`marquee relative w-full overflow-hidden py-4 border-y ${
        dark
          ? 'bg-[#0E0D0B] border-white/10 text-[#D4AF7A]'
          : 'bg-[#FAF7F2] border-[#E7E1D7] text-[#0E0D0B]'
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-content flex items-center gap-8 ${
          speed === 'slow' ? 'duration-[50s]' : 'duration-[35s]'
        }`}
      >
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-serif text-sm sm:text-base tracking-[0.2em] uppercase font-medium">
              {text}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#C88A2E]/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
