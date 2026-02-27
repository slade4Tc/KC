import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } }
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

export const hoverLift: Variants = {
  rest: { y: 0, scale: 1, boxShadow: '0 0 0 rgba(212,175,95,0)' },
  hover: {
    y: -6,
    scale: 1.012,
    boxShadow: '0 16px 40px rgba(212,175,95,0.2)',
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
  },
  tap: { scale: 0.992, transition: { duration: 0.15 } }
};

export const hoverImageZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
};
