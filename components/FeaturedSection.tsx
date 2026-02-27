import Link from 'next/link';
import { Card } from '@/lib/types';
import { CardGrid } from '@/components/CardGrid';

export function FeaturedSection({ cards, title, panel = false }: { cards: Card[]; title: string; panel?: boolean }) {
  return (
    <section className="py-14 sm:py-16">
      {panel && (
        <div className="mb-7 overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-[#2a2418]/80 via-[#1a1a1a]/80 to-[#141414]/80 p-6 backdrop-blur-xl sm:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gold">Curated Highlights</p>
          <h2 className="text-3xl font-semibold text-stone-100 sm:text-4xl">Featured Grails</h2>
          <p className="mt-3 max-w-2xl text-sm text-stone-300">Collector-selected pieces showcased for rarity, condition, and presentation.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/collections" className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-[#1c1810]">
              Explore Collection
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-stone-100">
              Inquire
            </Link>
          </div>
        </div>
      )}
      {!panel && (
        <div className="mb-7 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-stone-100 sm:text-3xl">{title}</h2>
        </div>
      )}
      <CardGrid cards={cards} />
    </section>
  );
}
