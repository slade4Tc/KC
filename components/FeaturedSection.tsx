import { Card } from '@/lib/types';
import { CardGrid } from '@/components/CardGrid';

export function FeaturedSection({ cards, title }: { cards: Card[]; title: string }) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mb-7 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-stone-100 sm:text-3xl">{title}</h2>
      </div>
      <CardGrid cards={cards} />
    </section>
  );
}
