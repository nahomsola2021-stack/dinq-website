import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { RouteFlow } from './RouteFlow';
import { waLink } from '../../lib/whatsapp';

interface FeatureBandProps {
  image: string;
  title: string;
  kicker: string;
  text: string;
  routePath?: string[];
  tags?: string[];
  bulletList?: string[];
  signature?: string;
  tagline?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export const FeatureBand: React.FC<FeatureBandProps> = ({
  image,
  title,
  kicker,
  text,
  routePath,
  tags = [],
  bulletList = [],
  signature,
  tagline,
  buttonText = 'Enquire on WhatsApp',
  buttonHref,
  className = '',
}) => {
  const targetLink = buttonHref || waLink(`Hello Dinq! I would like to enquire about "${title}".`);

  return (
    <div
      className={`reveal relative my-16 overflow-hidden rounded-[32px] bg-[#0E0D0B] text-[#FAF7F2] border border-white/10 grain ${className}`}
    >
      {/* Background with gradient scrim */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ImageWithFallback
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0D0B] via-[#0E0D0B]/85 to-transparent" />
        <div className="absolute inset-0 gold-glow opacity-60" />
      </div>

      {/* Content grid */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-16">
        <div className="max-w-3xl">
          {kicker && (
            <p className="eyebrow mb-3">
              {kicker}
            </p>
          )}

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#FAF7F2] leading-tight">
            {title}
          </h3>

          <p className="mt-4 text-base sm:text-lg font-light text-[#E7E1D7]/90 leading-relaxed">
            {text}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#D4AF7A]">
              {tags.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="font-medium">{tag}</span>
                  {i < tags.length - 1 && <span className="text-[#C88A2E]/50">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Route path */}
          {routePath && routePath.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <span className="text-xs uppercase tracking-widest text-[#C88A2E] block mb-3 font-semibold">
                Expedition Route Flow
              </span>
              <RouteFlow stops={routePath} dark={true} />
            </div>
          )}

          {/* Two-column bullet list */}
          {bulletList && bulletList.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bulletList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E7E1D7]/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C88A2E]/20 text-[#D4AF7A] mt-0.5">
                      <Check className="h-3 w-3 text-[#C88A2E]" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom actions & signatures */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
            <div>
              {signature && (
                <p className="font-serif italic text-lg text-[#D4AF7A]">
                  "{signature}"
                </p>
              )}
              {tagline && (
                <p className="text-xs tracking-wider uppercase text-[#E7E1D7]/60 mt-1">
                  {tagline}
                </p>
              )}
            </div>

            <a
              href={targetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <span>{buttonText}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
