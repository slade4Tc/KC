import { notFound } from 'next/navigation';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { CardInquiryBar } from '@/components/CardInquiryBar';
import { getCardById, getCards } from '@/lib/cards';
import { siteConfig } from '@/config/site';

export function generateStaticParams() {
  return getCards().map((card) => ({ id: card.id }));
}

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const card = getCardById(params.id);
  if (!card) notFound();

  return (
    <section className="pb-24 pt-8 sm:pt-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-stone-900">
            <ImageWithFallback src={card.frontImage} alt={card.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {card.gallery.map((img) => (
              <div key={img} className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-stone-900">
                <ImageWithFallback src={img} alt={card.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{card.id}</p>
          <h1 className="text-4xl font-semibold">{card.name}</h1>
          <p className="text-stone-300">{card.subtitle}</p>
          <p className="text-sm leading-relaxed text-stone-300">{card.description}</p>

          <details className="rounded-xl border border-white/10 p-4" open>
            <summary className="cursor-pointer text-sm font-medium">Specifications</summary>
            <ul className="mt-3 space-y-2 text-sm text-stone-300">
              <li>Category: {card.category}</li>
              <li>Grade: {card.grade}</li>
              <li>Status: {card.status}</li>
              <li>Year: {card.year}</li>
            </ul>
          </details>

          <details className="rounded-xl border border-white/10 p-4">
            <summary className="cursor-pointer text-sm font-medium">Collector Notes</summary>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-300">
              {card.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </details>

          <div className="hidden gap-3 lg:flex">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-gold px-5 py-3 text-sm font-medium text-[#1a1509]">
              Inquire on Instagram
            </a>
            <a href={`mailto:${siteConfig.email}`} className="rounded-full border border-white/20 px-5 py-3 text-sm">
              Email Inquiry
            </a>
          </div>
        </div>
      </div>
      <CardInquiryBar cardId={card.id} cardName={card.name} />
    </section>
  );
}
