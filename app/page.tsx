'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { FeaturedGrailsHero } from '@/components/FeaturedGrailsHero';
import { CategorySection } from '@/components/CategorySection';
import { fadeUp } from '@/lib/motion';
import { getCategoryCounts, getFeaturedCards, getNewestCards } from '@/lib/cards';

export default function HomePage() {
  const featuredCards = getFeaturedCards();
  const categories = getCategoryCounts();
  const newest = getNewestCards();
  const reduce = useReducedMotion();

  const careCards = [
    { title: 'Grading', desc: 'Every card is verified with matching serials and grading company records.' },
    { title: 'Storage', desc: 'Humidity-controlled, UV-safe handling from archive intake to shipment.' },
    { title: 'Shipping', desc: 'Double-boxed insured dispatch with signature confirmation worldwide.' }
  ] as const;

  // Scroll-trigger “build up from sides” (no blur to avoid stuck-blur bug)
  const careItem = {
    hidden: (i: number) =>
      reduce
        ? { opacity: 0, y: 10 }
        : {
            opacity: 0,
            y: 14,
            // stronger slide so it feels like "from outside" on desktop too
            x: i === 0 ? -120 : i === 2 ? 120 : 0
          },
    show: (i: number) =>
      reduce
        ? { opacity: 1, y: 0, transition: { duration: 0.3 } }
        : {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.08
            }
          }
  };

  return (
    <>
      <Hero />
      <FeaturedGrailsHero cards={featuredCards} />
      <CategorySection categories={categories} />

      {/* Authenticity & Care (scroll-trigger) */}
      <section className="py-14 sm:py-16">
        <h2 className="mb-7 text-2xl font-semibold sm:text-3xl">Authenticity & Care</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {careCards.map((c, i) => (
            <motion.article
              key={c.title}
              className="glass rounded-2xl p-6 transition-colors hover:border-gold/35"
              custom={i}
              variants={careItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45, margin: '0px 0px -10% 0px' }}
              whileHover={reduce ? undefined : { y: -4 }}
            >
              <h3 className="mb-3 text-lg font-medium text-stone-100">{c.title}</h3>
              <p className="text-sm leading-relaxed text-stone-300">{c.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <FeaturedSection cards={newest} title="New Additions" />

      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
      >
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
