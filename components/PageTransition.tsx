'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div initial="hidden" animate="show" variants={stagger}>
      <motion.div variants={fadeUp}>{children}</motion.div>
    </motion.div>
  );
}
