import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface CalloutProps {
  variant?: 'important' | 'note';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = 'note',
  title,
  children,
  className = '',
}) => {
  const isImportant = variant === 'important';

  return (
    <div
      role={isImportant ? 'alert' : 'note'}
      className={`reveal my-8 rounded-[24px] border p-6 sm:p-7 ${
        isImportant
          ? 'bg-[#18181B] border-[#C88A2E]/50 text-[#FAF7F2] shadow-[0_8px_24px_rgba(200,138,46,0.12)]'
          : 'bg-[#FAF7F2] border-[#E7E1D7] text-[#0E0D0B]'
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
            isImportant
              ? 'border-[#C88A2E]/50 bg-[#C88A2E]/20 text-[#D4AF7A]'
              : 'border-[#0E0D0B]/20 bg-[#0E0D0B]/5 text-[#C88A2E]'
          }`}
        >
          {isImportant ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1">
          {title && (
            <h4
              className={`font-serif text-lg font-semibold tracking-tight mb-1.5 ${
                isImportant ? 'text-[#D4AF7A]' : 'text-[#0E0D0B]'
              }`}
            >
              {title}
            </h4>
          )}
          <div
            className={`text-sm leading-relaxed font-light ${
              isImportant ? 'text-[#E7E1D7]/90' : 'text-[#52525B]'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
