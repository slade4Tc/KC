'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

export function CardInquiryBar({ cardId, cardName }: { cardId: string; cardName: string }) {
  const [copied, setCopied] = useState(false);

  const message = `Inquiry for ${cardName} (${cardId}) from Kroba Cards.`;

  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#151515]/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl gap-2">
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-gold px-4 py-3 text-center text-sm font-medium text-[#1a1509]">
          Instagram
        </a>
        <a href={`mailto:${siteConfig.email}`} className="flex-1 rounded-full border border-white/20 px-4 py-3 text-center text-sm">
          Email
        </a>
        <button onClick={copy} className="rounded-full border border-white/20 px-4 py-3 text-xs">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
