import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';

interface PromiseBandProps {
  image?: string;
  line1?: string;
  line2ItalicGold?: string;
  line3?: string;
  spacedWords?: string[];
  brandLine?: string;
  className?: string;
}

export const PromiseBand: React.FC<PromiseBandProps> = ({
  image = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
  line1 = 'Discover the Places.',
  line2ItalicGold = 'Meet the People.',
  line3 = 'Live the Story.',
  spacedWords = ['DISCOVER', 'EXPERIENCE', 'AUTHENTICITY', 'RESPECT'],
  brandLine = 'DINQ TOUR, TRAVEL & EVENTS — ETHIOPIA',
  className = '',
}) => {
  return (
    <div
      className={`reveal relative my-16 overflow-hidden rounded-[32px] bg-[#0E0D0B] py-20 px-6 sm:px-12 text-center text-[#FAF7F2] border border-white/10 grain ${className}`}
    >
      {/* Background with deep scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <ImageWithFallback
          src={image}
          alt="Ethiopia wilderness and heritage"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0E0D0B]/80" />
        <div className="absolute inset-0 gold-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
        {/* Spaced uppercase words */}
        {spacedWords && spacedWords.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-bold tracking-[0.3em] uppercase text-[#C88A2E]">
            {spacedWords.map((word, i) => (
              <React.Fragment key={i}>
                <span>{word}</span>
                {i < spacedWords.length - 1 && <span className="opacity-40">·</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Centred Statement Serif Lines */}
        <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] text-[#FAF7F2]">
          {line1 && <div>{line1}</div>}
          {line2ItalicGold && (
            <div className="italic font-normal text-gold-gradient my-1 sm:my-2">
              {line2ItalicGold}
            </div>
          )}
          {line3 && <div>{line3}</div>}
        </div>

        {/* Brand line */}
        {brandLine && (
          <p className="mt-8 text-xs font-semibold tracking-[0.25em] uppercase text-[#E7E1D7]/70">
            {brandLine}
          </p>
        )}
      </div>
    </div>
  );
};
