import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  Icon?: React.ElementType;
  title: string;
  titleItalic?: string;
  subtitle: string;
  crumbs?: Crumb[];
  tall?: boolean;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  image,
  imageAlt = 'Ethiopian Landscape',
  eyebrow,
  Icon,
  title,
  titleItalic,
  subtitle,
  crumbs,
  tall = false,
  children,
}) => {
  return (
    <div
      className={`page-hero relative w-full overflow-hidden bg-[#0E0D0B] text-[#FAF7F2] ${
        tall ? 'min-h-[75vh] md:min-h-[85vh]' : 'min-h-[55vh] md:min-h-[65vh]'
      } flex flex-col justify-end grain`}
    >
      {/* Background Image with Parallax & Scrim */}
      <div className="hero-bg absolute inset-0 z-0 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          loading="eager"
          className="h-full w-full object-cover object-center transform-gpu will-change-transform scale-105"
        />
        {/* Layered cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/60 to-black/40" />
        <div className="absolute inset-0 gold-glow opacity-80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center space-x-2 text-xs font-medium text-[#D4AF7A]/80"
          >
            <Link to="/" className="hover:text-[#FAF7F2] transition-colors">
              Home
            </Link>
            {crumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 text-[#C88A2E]/60 shrink-0" />
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-[#FAF7F2] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#FAF7F2]">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <div className="hero-eyebrow mb-4">
            <span className="eyebrow">
              {Icon && <Icon className="mr-1.5 h-3.5 w-3.5 inline text-[#C88A2E]" />}
              {eyebrow}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="hero-title font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#FAF7F2] leading-[1.05] max-w-4xl text-balance">
          {title}{' '}
          {titleItalic && (
            <span className="italic font-normal text-gold-gradient block sm:inline">
              {titleItalic}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p className="hero-sub mt-6 max-w-2xl text-base sm:text-lg md:text-xl font-light text-[#E7E1D7]/90 leading-relaxed">
          {subtitle}
        </p>

        {/* Extra slot (actions, filters, badges) */}
        {children && <div className="hero-action mt-8">{children}</div>}
      </div>

      {/* 3px Ethiopian Tri-Colour line brand motif at bottom edge */}
      <div className="eth-line relative z-20" />
    </div>
  );
};
