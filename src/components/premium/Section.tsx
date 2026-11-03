import React from 'react';

export type SectionTone = 'light' | 'white' | 'dark' | 'ink';

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  glow?: boolean;
  narrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  tone = 'light',
  glow = false,
  narrow = false,
  className = '',
  children,
}) => {
  const toneClasses = {
    light: 'bg-[#FAF7F2] text-[#0E0D0B]',
    white: 'bg-white text-[#0E0D0B]',
    dark: 'bg-[#18181B] text-[#FAF7F2] grain',
    ink: 'bg-[#0E0D0B] text-[#FAF7F2] grain',
  }[tone];

  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 overflow-hidden ${toneClasses} ${
        glow ? 'gold-glow' : ''
      } ${className}`}
    >
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          narrow ? 'max-w-4xl' : 'max-w-7xl'
        }`}
      >
        {children}
      </div>
    </section>
  );
};

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  sub?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  eyebrow,
  title,
  titleItalic,
  sub,
  align = 'left',
  tone = 'light',
  className = '',
}) => {
  const isDark = tone === 'dark';
  const isCenter = align === 'center';

  return (
    <div
      className={`reveal mb-12 md:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      {eyebrow && (
        <div className={`mb-3 ${isCenter ? 'flex justify-center' : ''}`}>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] ${
          isDark ? 'text-[#FAF7F2]' : 'text-[#0E0D0B]'
        }`}
      >
        {title}{' '}
        {titleItalic && (
          <span
            className={`italic font-normal block sm:inline ${
              isDark ? 'text-gold-gradient' : 'text-[#C88A2E]'
            }`}
          >
            {titleItalic}
          </span>
        )}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-base sm:text-lg font-light leading-relaxed ${
            isDark ? 'text-[#E7E1D7]/80' : 'text-[#18181B]/75'
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
};
