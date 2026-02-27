'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { MobileDrawer } from '@/components/MobileDrawer';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition-all ${scrolled ? 'border-b border-white/10 bg-[#141414]/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-[#181818] sm:h-9 sm:w-9">
            {/* Upload your logo to /public/KC_logo.png (case-sensitive). */}
            <img src="/KC_logo.png" alt="KC" className="h-6 w-6 object-contain sm:h-7 sm:w-7" />
          </span>
          <span className="text-sm font-semibold tracking-[0.24em] text-gold">KROBA CARDS</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-stone-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <span className="block h-0.5 w-6 bg-stone-100" />
          <span className="mt-1.5 block h-0.5 w-6 bg-stone-100" />
          <span className="mt-1.5 block h-0.5 w-6 bg-stone-100" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
