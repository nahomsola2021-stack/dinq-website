import React from 'react';
import { Check } from 'lucide-react';

interface CheckListProps {
  items: string[];
  numbered?: boolean;
  columns?: 1 | 2 | 3;
  dark?: boolean;
  className?: string;
}

export const CheckList: React.FC<CheckListProps> = ({
  items,
  numbered = false,
  columns = 2,
  dark = false,
  className = '',
}) => {
  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns];

  return (
    <div className={`grid gap-4 ${colClass} ${className}`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-colors ${
            dark
              ? 'bg-[#18181B]/80 border-white/5 hover:border-[#C88A2E]/30 text-[#FAF7F2]'
              : 'bg-white border-[#E7E1D7] hover:border-[#C88A2E]/40 text-[#0E0D0B] shadow-xs'
          }`}
        >
          {numbered ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C88A2E]/15 font-serif text-xs font-bold text-[#C88A2E]">
              {idx + 1}
            </span>
          ) : (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C88A2E]/20 text-[#C88A2E]">
              <Check className="h-3.5 w-3.5" />
            </span>
          )}
          <span className="text-sm font-medium leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  );
};
