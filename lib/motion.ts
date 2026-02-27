import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45 } }
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const hoverLift: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 0 0 rgba(212,175,95,0)'
  },
  hover: {
    y: -7,
    scale: 1.012,
    boxShadow: '0 18px 42px rgba(212,175,95,0.18)',
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  }
};

export const hoverImageZoom: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export const badgeHover: Variants = {
  rest: { y: 0, opacity: 0.96 },
  hover: {
    y: -3,
    opacity: 1,
    transition: { duration: 0.22 }
  }
};
