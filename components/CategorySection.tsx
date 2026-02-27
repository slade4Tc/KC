'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { hoverLift } from '@/lib/motion';

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
          <motion.div key={cat.slug} initial="rest" animate="rest" whileHover={reduce ? 'rest' : 'hover'} whileTap={reduce ? 'rest' : 'tap'} variants={hoverLift}>
            <Link href={`/collections/${cat.slug}`} className="group relative block overflow-hidden rounded-2xl border border-white/10 active:scale-[0.99]">
              <div className="absolute inset-0">
                {cat.imageUrl ? (
                  <ImageWithFallback src={cat.imageUrl} alt={cat.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#302718] via-[#1e1e1e] to-[#141414]" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/25" />
              <div className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-gold/20 to-transparent transition duration-700 group-hover:translate-x-[130%]" />
              <div className="relative flex aspect-[4/3] flex-col justify-end p-6">
                <p className="text-2xl font-semibold text-stone-100">{cat.label}</p>
                <p className="mt-1 text-sm text-stone-300">{cat.count} cards</p>
                {cat.description && <p className="mt-2 text-xs text-stone-300/90">{cat.description}</p>}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
