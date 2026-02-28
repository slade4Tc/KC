'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';

export function Hero() {
  return (
    <section className="pb-24 pt-14 sm:pb-28 sm:pt-20">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="space-y-6">
        <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.24em] text-stone-400">
          Collector Gallery
        </motion.p>
        <motion.h1 variants={fadeUp} className="max-w-5xl text-5xl font-semibold leading-[0.96] text-stone-100 sm:text-7xl lg:text-8xl">
          Kroba Cards
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
          Curated grails for collectors who value rarity, provenance, and timeless presentation. Explore premium releases across Pokemon, sports, anime, and Marvel categories.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-4">
          <Link href="/collections" className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-[#1c1810] shadow-glow transition hover:brightness-105">
            Explore Collection
          </Link>
          <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 text-sm text-stone-100 transition hover:bg-white/10">
            Inquire
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
