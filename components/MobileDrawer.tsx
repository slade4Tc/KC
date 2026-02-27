'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close menu overlay"
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[84%] max-w-sm flex-col border-l border-white/10 bg-[#161616]/95 p-6 backdrop-blur-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-[0.24em] text-gold">KROBA CARDS</span>
              <button onClick={onClose} className="text-2xl text-stone-200" aria-label="Close menu">
                ×
              </button>
            </div>
            <nav className="space-y-4">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className="block py-2 text-lg text-stone-200">
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
