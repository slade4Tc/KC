'use client';

import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { CategorySection } from '@/components/CategorySection';
import { fadeUp } from '@/lib/motion';
import { getCategoryCounts, getFeaturedCards, getNewestCards } from '@/lib/cards';

export default function HomePage() {
  const featured = getFeaturedCards();
  const categories = getCategoryCounts();
  const newest = getNewestCards();

  return (
    <>
      <Hero />
      <FeaturedSection cards={featured} title="Featured Grails" panel />
      <CategorySection categories={categories} />

      <section className="py-14 sm:py-16">
        <h2 className="mb-7 text-2xl font-semibold sm:text-3xl">Authenticity & Care</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Grading', 'Every card is verified with matching serials and grading company records.'],
            ['Storage', 'Humidity-controlled, UV-safe handling from archive intake to shipment.'],
            ['Shipping', 'Double-boxed insured dispatch with signature confirmation worldwide.']
          ].map(([title, desc]) => (
            <article key={title} className="glass rounded-2xl p-6">
              <h3 className="mb-3 text-lg font-medium text-stone-100">{title}</h3>
              <p className="text-sm leading-relaxed text-stone-300">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <FeaturedSection cards={newest} title="New Additions" />

      <motion.section className="py-16" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={fadeUp}>
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Collector Story</p>
            <h2 className="text-3xl font-semibold">Built by collectors, for collectors.</h2>
            <p className="text-sm leading-relaxed text-stone-300">
              Kroba Cards began as a private archive and evolved into a boutique destination for high-end trading cards. Our approach centers on transparent provenance, careful curation, and timeless visual presentation.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a2418] via-[#1f1f1f] to-[#141414] p-8">
            <p className="text-sm leading-relaxed text-stone-300">
              We source selectively, maintain strict condition standards, and handle each piece as a legacy asset. Whether you are refining a personal collection or acquiring long-hold grails, each inquiry receives concierge-level attention.
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
}
