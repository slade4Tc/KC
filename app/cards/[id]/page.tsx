import { notFound } from 'next/navigation';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { getCardById, getCards } from '@/lib/cards';
import { siteConfig } from '@/config/site';

export function generateStaticParams() {
  return getCards().map((card) => ({ id: card.id }));
}

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const card = getCardById(params.id);
  if (!card) notFound();

  return (
    <section className="py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-stone-900">
          <ImageWithFallback src={card.frontImage} alt={card.name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Card Detail</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{card.name}</h1>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs ${
                card.status === 'available'
                  ? 'border-emerald-300/30 bg-emerald-400/20 text-emerald-300'
                  : 'border-stone-300/30 bg-stone-400/20 text-stone-300'
              }`}
            >
              {card.status === 'available' ? 'Available' : 'Sold'}
            </span>
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-[#161616]/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Specs</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <dt className="text-stone-400">ID</dt>
              <dd>{card.id}</dd>
              <dt className="text-stone-400">Year</dt>
              <dd>{card.year ?? '—'}</dd>
              <dt className="text-stone-400">Category</dt>
              <dd>{card.category}</dd>
              <dt className="text-stone-400">Grade</dt>
              <dd>{card.grade ?? '—'}</dd>
              <dt className="text-stone-400">Set</dt>
              <dd>{card.subtitle}</dd>
              <dt className="text-stone-400">Serial</dt>
              <dd>{card.serial ?? '—'}</dd>
              <dt className="text-stone-400">Tags</dt>
              <dd>{card.tags?.join(', ') || '—'}</dd>
              <dt className="text-stone-400">Notes</dt>
              <dd>{card.notes?.join(', ') || '—'}</dd>
              <dt className="text-stone-400">Status</dt>
              <dd>{card.status === 'available' ? 'Available' : 'Sold'}</dd>
            </dl>
          </div>

          <p className="text-sm leading-relaxed text-stone-300">{card.description}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-[#1a1509]">
              Inquire on Instagram
            </a>
            <a href={`mailto:${siteConfig.email}`} className="rounded-full border border-white/20 px-5 py-3 text-center text-sm">
              Inquire via Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
