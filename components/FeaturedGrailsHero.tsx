'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/lib/types';
import { hoverImageZoom, hoverLift } from '@/lib/motion';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const statusClass: Record<Card['status'], string> = {
  available: 'bg-emerald-400/20 text-emerald-300 border-emerald-300/30',
  sold: 'bg-stone-400/20 text-stone-300 border-stone-300/30'
};

const statusText: Record<Card['status'], string> = {
  available: 'Available',
  sold: 'Sold'
};

function FeaturedRowCard({ card }: { card: Card }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover={reduce ? 'rest' : 'hover'}
      whileTap={reduce ? 'rest' : 'tap'}
      variants={hoverLift}
      className="w-[180px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#151515]/80"
    >
      <Link href={`/cards/${card.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
          <motion.div variants={hoverImageZoom} className="h-full w-full">
            <ImageWithFallback src={card.frontImage} alt={card.name} className="h-full w-full object-cover" />
          </motion.div>
          <span className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[11px] ${statusClass[card.status]}`}>{statusText[card.status]}</span>
        </div>
        <div className="p-3">
          <p className="truncate text-sm font-medium text-stone-100">{card.name}</p>
          <p className="mt-1 text-xs tracking-[0.16em] text-stone-400">{card.id}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedGrailsHero({ cards }: { cards: Card[] }) {
  return (
    <section className="py-10 sm:py-12">
      <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-[#2b2418]/75 via-[#171717]/90 to-[#111111]/95 p-5 shadow-glow backdrop-blur-xl sm:p-7">
        <h2 className="mb-4 text-3xl font-semibold text-stone-100 sm:text-4xl">Featured</h2>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {cards.map((card) => (
            <FeaturedRowCard key={card.id} card={card} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Link href="/collections" className="text-sm text-gold underline-offset-4 hover:underline">
          View all featured
        </Link>
      </div>
    </section>
  );
}
