import { Card } from '@/lib/types';
import { CardTile } from '@/components/CardTile';

export function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <CardTile key={card.id} card={card} />
      ))}
    </div>
  );
}
