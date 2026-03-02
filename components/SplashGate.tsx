'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  ms?: number; // default 2000
};

const KEY = 'kc_splash_shown_v1';

export default function SplashGate({ children, ms = 4000 }: Props) {
  const ranOnce = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // ✅ Guard against React StrictMode double-invoking effects in dev
    if (ranOnce.current) return;
    ranOnce.current = true;

    setMounted(true);

    try {
      const already = sessionStorage.getItem(KEY);
      if (already === '1') {
        setShow(false);
        return;
      }
      sessionStorage.setItem(KEY, '1');
      setShow(true);
    } catch {
      // if storage blocked, still show once per mount
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const t1 = window.setTimeout(() => setFade(true), Math.max(0, ms - 350));
    const t2 = window.setTimeout(() => setShow(false), ms);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [show, ms]);

  return (
    <>
      {children}

      {mounted && show && (
        <div
          aria-hidden="true"
          className={[
            'fixed inset-0 z-[9999]',
            'bg-[#07080b]',
            'flex items-center justify-center',
            'transition-opacity duration-300',
            fade ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <div className="w-full max-w-[520px] px-6 text-center">
            <div className="text-5xl sm:text-6xl font-semibold tracking-tight">
              <span className="text-sky-400">Kroba</span>
              <span className="text-amber-400">Cards</span>
            </div>

            <div className="mt-4 text-xs tracking-[0.25em] text-white/50">
              ΦΟΡΤΩΣΗ
            </div>

            <div className="mt-6 h-[6px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full w-full origin-left animate-[kcbar_2s_linear_forwards] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #f59e0b 100%)',
                }}
              />
            </div>

            <div className="mt-3 text-[11px] text-white/35">100%</div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at bottom right, rgba(245,158,11,0.12) 0%, rgba(0,0,0,0) 55%)',
            }}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes kcbar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </>
  );
}
