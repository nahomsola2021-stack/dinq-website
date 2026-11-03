import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Dinq Ethiopia Travel',
  fallbackTitle,
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#18181B] via-[#0E0D0B] to-[#27272A] p-6 text-center text-[#D4AF7A] ${className}`}
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C88A2E_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#C88A2E]/30 bg-[#C88A2E]/10">
            <Compass className="h-5 w-5 text-[#C88A2E]" />
          </div>
          <span className="font-serif text-sm tracking-widest text-[#FAF7F2]/90">
            {fallbackTitle || alt || 'Dinq Ethiopia'}
          </span>
          <span className="mt-1 text-[10px] tracking-widest uppercase text-[#C88A2E]/70">
            Ethiopia Beyond the Ordinary
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
