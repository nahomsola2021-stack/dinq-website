import React from 'react';
import { Compass, MessageCircle, ArrowRight } from 'lucide-react';
import { waLink } from '../../lib/whatsapp';
import { useBooking } from '../../context/BookingContext';

interface CTABandProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const CTABand: React.FC<CTABandProps> = ({
  title = 'Ready to Discover Ethiopia Beyond the Ordinary?',
  subtitle = 'Whether you seek high-altitude mountain trekking, living cultural festivals, or a bespoke safari across rare wildlife sanctuaries, our expedition team is ready to curate your journey.',
  className = '',
}) => {
  const { openBooking } = useBooking();
  const whatsappHref = waLink('Hello Dinq Tour, Travel & Events! I would like to consult with an expedition planner for an upcoming journey to Ethiopia.');

  return (
    <div
      className={`reveal relative my-14 overflow-hidden rounded-lg bg-[#241C18] py-14 sm:py-16 px-6 sm:px-10 text-[#F5E9DA] border border-[#3D3028] ${className}`}
    >
      <div className="absolute inset-0 gold-glow opacity-60" />

      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Brand line eyebrow */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95F49] mb-3">
          Travel with Purpose
        </span>

        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] text-[#F5E9DA]">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base font-light text-[#F5E9DA]/80 leading-relaxed">
          {subtitle}
        </p>

        {/* Editorial Brand Line */}
        <div className="mt-6 font-serif italic text-base sm:text-lg text-[#DDAA42]">
          Discover the Places · Meet the People · Live the Story
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openBooking()}
            className="btn-terracotta cursor-pointer"
          >
            <Compass className="h-4 w-4" />
            <span>Book Your Expedition</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold !text-[#F5E9DA] !border-[#E7D0B8]/30 hover:!border-[#D95F49]"
          >
            <MessageCircle className="h-4 w-4 text-[#D95F49]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
