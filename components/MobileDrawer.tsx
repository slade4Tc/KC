'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col glass p-6"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg font-semibold tracking-[0.24em] text-gold">KROBA CARDS</span>
              <button onClick={onClose} className="text-2xl text-stone-200">
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
