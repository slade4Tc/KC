import Link from 'next/link';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface CategoryItem {
  slug: string;
  label: string;
  image?: string;
  description?: string;
  count: number;
}

export function CategorySection({ categories }: { categories: CategoryItem[] }) {
  return (
    <section className="py-14 sm:py-16">
      <h2 className="mb-7 text-2xl font-semibold sm:text-3xl">Category Showcase</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/collections/${cat.slug}`} className="shine group relative overflow-hidden rounded-2xl border border-white/10">
            <div className="absolute inset-0">
              {cat.image ? (
                <ImageWithFallback src={cat.image} alt={cat.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#302718] via-[#1e1e1e] to-[#141414]" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
            <div className="relative flex aspect-[4/3] flex-col justify-end p-6">
              <p className="text-2xl font-semibold text-stone-100">{cat.label}</p>
              <p className="mt-1 text-sm text-stone-300">{cat.count} cards</p>
              {cat.description && <p className="mt-2 text-xs text-stone-300/90">{cat.description}</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
