import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  endValue: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

interface StatBandProps {
  stats?: StatItem[];
  className?: string;
}

const DEFAULT_STATS: StatItem[] = [
  { endValue: 10, suffix: '+', label: 'Years of Experience', sublabel: 'Across tourism, logistics & media' },
  { endValue: 15, suffix: '', label: 'Curated Expeditions', sublabel: 'Signature routes & national traverses' },
  { endValue: 12, suffix: '+', label: 'Mountain Experiences', sublabel: 'From Simien to Bale afro-alpine summits' },
  { endValue: 14, suffix: '', label: 'Birding Destinations', sublabel: 'Great Rift Valley & endemic flyways' },
];

const AnimatedCounter: React.FC<{ end: number; suffix: string }> = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const duration = 2500; // Slower, smoother 2.5 second animation

          // easeOutQuart: A very graceful, smooth deceleration curve
          const easeOutQuart = (t: number): number => {
            return 1 - Math.pow(1 - t, 4);
          };

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Apply the smooth easing to the progress
            const easedProgress = easeOutQuart(progress);
            
            setCount(Math.ceil(easedProgress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          observer.disconnect(); // Only animate once when scrolled into view
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <span
      ref={ref}
      className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gold-gradient bg-gradient-to-b from-[#FFF9F2] via-[#E7C175] to-[#B98A4E] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(231,193,117,0.2)] tabular-nums"
    >
      {count}{suffix}
    </span>
  );
};

export const StatBand: React.FC<StatBandProps> = ({
  stats = DEFAULT_STATS,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] bg-[#0E0D0B] py-16 px-6 sm:px-12 border border-white/10 grain ${className}`}
    >
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80')] bg-fixed bg-center bg-cover opacity-30 mix-blend-overlay -z-20"
        aria-hidden="true"
      />
      
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D0B]/95 via-[#1A130F]/90 to-[#0E0D0B]/95 -z-10" />
      
      {/* Custom Glow */}
      <div className="absolute inset-0 gold-glow opacity-30 -z-10" />

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="reveal flex flex-col items-center justify-center">
            <AnimatedCounter end={stat.endValue} suffix={stat.suffix} />
            <span className="mt-3 text-sm sm:text-base font-semibold text-[#FAF7F2]">
              {stat.label}
            </span>
            {stat.sublabel && (
              <span className="mt-1.5 text-xs text-[#E7E1D7]/60 font-light max-w-[200px] leading-relaxed">
                {stat.sublabel}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};