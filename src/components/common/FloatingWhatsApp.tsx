import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '../../lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappHref = waLink('Hello Dinq Tour, Travel & Events! I would like to consult with your expedition team.');

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#18181B] p-3 sm:px-5 sm:py-3.5 text-[#FAF7F2] shadow-2xl border border-[#C88A2E]/50 transition-all duration-300 hover:scale-105 hover:bg-[#0E0D0B] hover:shadow-[0_8px_30px_rgba(200,138,46,0.35)]"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
        </span>
        <MessageCircle className="h-5 w-5 text-[#25D366] transition-transform duration-200 group-hover:rotate-12" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide text-[#FAF7F2]">
          Chat with Dinq
        </span>
      </a>
    </aside>
  );
};
