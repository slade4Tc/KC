'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { FeaturedGrailsHero } from '@/components/FeaturedGrailsHero';
import { CategorySection } from '@/components/CategorySection';
import { fadeUp } from '@/lib/motion';
import { getCategoryCounts, getFeaturedCards, getNewestCards } from '@/lib/cards';

function useIsDesktop(breakpointPx = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpointPx]);

  return isDesktop;
}

export default function HomePage() {
  const featuredCards = getFeaturedCards();
  const categories = getCategoryCounts();
  const newest = getNewestCards();
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop(768);

  const careCards = useMemo(
    () =>
      [
        { title: 'Grading', desc: 'Every card is verified with matching serials and grading company records.' },
        { title: 'Storage', desc: 'Humidity-controlled, UV-safe handling from archive intake to shipment.' },
        { title: 'Shipping', desc: 'Double-boxed insured dispatch with signature confirmation worldwide.' }
      ] as const,
    []
  );

  // Children: side enter on desktop, keep your mobile vibe
  const careItem = {
    hidden: (i: number) => {
      if (reduce) return { opacity: 0, y: 10 };

      if (isDesktop) {
        // stronger side enter on desktop
        const x = i === 0 ? -180 : i === 2 ? 180 : 0;
        const y = i === 1 ? 18 : 6;
        return { opacity: 0, x, y };
      }

      // mobile (your "perfect"): side + slight y
      const x = i === 0 ? -90 : i === 2 ? 90 : 0;
      const y = i === 1 ? 18 : 10;
      return { opacity: 0, x, y };
    },
    show: () => {
      if (reduce) return { opacity: 1, x: 0, y: 0, transition: { duration: 0.25 } };
      return {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      };
    }
  };

  /**
   * B order:
   * - Left (i=0) and Right (i=2) animate together
   * - Middle (i=1) animates AFTER
   *
   * We do this by giving a "phase":
   * left/right => phase 0
   * middle     => phase 1
   */
  const phase = (i: number) => (i === 1 ? 1 : 0);

  return (
    <>
      <Hero />
      <FeaturedGrailsHero cards={featuredCards} />
      <CategorySection categories={categories} />

      {/* Authenticity & Care (scroll-trigger) */}
      <section className="py-14 sm:py-16">
        <h2 className="mb-7 text-2xl font-semibold sm:text-3xl">Authenticity & Care</h2>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45, margin: '0px 0px -10% 0px' }}
        >
          {careCards.map((c, i) => (
            <motion.article
              key={c.title}
              className="glass rounded-2xl p-6 transition-colors hover:border-gold/35"
              custom={i}
              variants={careItem}
              // phase-based delay: left/right together, middle after
              transition={
                reduce
                  ? undefined
                  : {
                      delay: phase(i) * 0.18,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
              }
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
              whileHover={reduce ? undefined : { y: -4 }}
            >
              <h3 className="mb-3 text-lg font-medium text-stone-100">{c.title}</h3>
              <p className="text-sm leading-relaxed text-stone-300">{c.desc}</p>
            </motion.article>
          ))}
        </motion.div>
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
              Kroba Cards began as a private archive and evolved into a boutique destination for high-end trading cards.
              Our approach centers on transparent provenance, careful curation, and timeless visual presentation.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a2418] via-[#1f1f1f] to-[#141414] p-8">
            <p className="text-sm leading-relaxed text-stone-300">
              We source selectively, maintain strict condition standards, and handle each piece as a legacy asset.
              Whether you are refining a personal collection or acquiring long-hold grails, each inquiry receives
              concierge-level attention.
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
}
