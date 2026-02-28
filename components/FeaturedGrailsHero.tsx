'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Card } from '@/lib/types';
import { hoverImageZoom, hoverLift } from '@/lib/motion';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const statusClass: Record<Card['status'], string> = {
  available: 'bg-emerald-400/20 text-emerald-200 border-emerald-200/30',
  sold: 'bg-stone-400/20 text-stone-200 border-stone-200/30'
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
      className="w-[180px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#151515]/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
    >
      <Link href={`/cards/${card.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
          <motion.div variants={hoverImageZoom} className="h-full w-full">
            <ImageWithFallback
              src={card.frontImage}
              alt={card.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Badge: always readable on top of images */}
          <span
            className={[
              'pointer-events-none absolute right-2 top-2 z-20 inline-flex items-center gap-1',
              'rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide',
              'backdrop-blur-xl',
              'bg-black/55 shadow-[0_8px_20px_rgba(0,0,0,0.55)]',
              'ring-1 ring-white/10',
              statusClass[card.status]
            ].join(' ')}
          >
            {statusText[card.status]}
          </span>

          {/* subtle top gradient so text/badge never fights highlights */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black/55 to-transparent" />
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
        <h2 className="mb-4 text-3xl font-semibold text-stone-100 sm:text-4xl">
          Featured
        </h2>

        <div className="relative">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#151515]/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#151515]/70 to-transparent" />

          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {cards.map((card) => (
              <FeaturedRowCard key={card.id} card={card} />
            ))}
          </div>
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
