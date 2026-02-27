'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/lib/types';
import { hoverImageZoom, hoverLift } from '@/lib/motion';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const badgeClass: Record<Card['status'], string> = {
  available: 'bg-emerald-400/20 text-emerald-300 border-emerald-300/30',
  sold: 'bg-stone-400/20 text-stone-300 border-stone-300/30'
};

const badgeText: Record<Card['status'], string> = {
  available: 'Available',
  sold: 'Sold'
};

export function CardTile({ card }: { card: Card }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover={reduce ? 'rest' : 'hover'}
      whileTap={reduce ? 'rest' : 'tap'}
      variants={hoverLift}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-gold/35"
    >
      <Link href={`/cards/${card.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
          <motion.div variants={hoverImageZoom} className="h-full w-full">
            <ImageWithFallback src={card.frontImage} alt={card.name} className="h-full w-full object-cover" />
          </motion.div>
          <span className={`pointer-events-none absolute right-3 top-3 z-20 rounded-full border bg-[#121212]/70 px-3 py-1 text-xs backdrop-blur ${badgeClass[card.status]}`}>{badgeText[card.status]}</span>
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs tracking-[0.18em] text-stone-400">{card.id}</p>
          <h3 className="text-lg font-semibold text-stone-100">{card.name}</h3>
          <p className="text-sm text-stone-400">{card.subtitle}</p>
        </div>
      </Link>
    </motion.article>
  );
}
