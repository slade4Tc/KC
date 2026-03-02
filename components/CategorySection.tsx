'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { hoverLift } from '@/lib/motion';
import { resolveImageSrc } from '@/lib/media';

interface CategoryItem {
  slug: string;
  label: string;
  imageUrl?: string;
  description?: string;
  count: number;
}

export function CategorySection({ categories }: { categories: CategoryItem[] }) {
  const reduce = useReducedMotion();

  return (
    <section className="py-14 sm:py-16">
      <h2 className="mb-7 text-2xl font-semibold sm:text-3xl">Category Showcase</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <motion.div
            key={cat.slug}
            initial="rest"
            animate="rest"
            whileHover={reduce ? 'rest' : 'hover'}
            whileTap={reduce ? 'rest' : 'tap'}
            variants={hoverLift}
          >
            <Link
              href={`/collections/${cat.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 active:scale-[0.99]"
            >
              <div className="absolute inset-0">
                {cat.imageUrl ? (
                  <ImageWithFallback
                    src={resolveImageSrc(cat.imageUrl)}
                    alt={cat.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#302718] via-[#1e1e1e] to-[#141414]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
              </div>

              <div className="relative flex min-h-[170px] flex-col justify-end p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{cat.label}</h3>
                    {cat.description ? <p className="mt-1 text-sm text-stone-300">{cat.description}</p> : null}
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-stone-200">
                    {cat.count}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}