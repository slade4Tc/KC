'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
  ms?: number;
};

const KEY = 'kc_splash_shown_v1';
const LOGO_SRC = '/KC_logo.png';

export default function SplashGate({ children, ms = 4000 }: Props) {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  const cssVars = useMemo(() => ({ ['--kc-splash-ms' as any]: `${ms}ms` }), [ms]);

  useEffect(() => {
    let shouldShow = true;

    try {
      const already = sessionStorage.getItem(KEY);
      if (already === '1') shouldShow = false;
      else sessionStorage.setItem(KEY, '1');
    } catch {
      shouldShow = true;
    }

    if (!shouldShow) {
      setReady(true);
      return;
    }

    setShow(true);

    const t1 = window.setTimeout(() => setFade(true), Math.max(0, ms - 350));
    const t2 = window.setTimeout(() => {
      setShow(false);
      setReady(true);
    }, ms);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [ms]);

  if (!ready && !show) return null;

  return (
    <>
      {!ready && show && (
        <div
          aria-hidden="true"
          style={cssVars}
          className={[
            'fixed inset-0 z-[9999]',
            'flex items-center justify-center',
            'bg-[#070606]',
            'transition-opacity duration-300',
            fade ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          {/* Premium background layers (gold/charcoal only) */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  // warm gold pools + deep vignette
                  'radial-gradient(1200px 700px at 18% 22%, rgba(210,170,95,0.14) 0%, rgba(0,0,0,0) 55%), radial-gradient(1100px 700px at 82% 78%, rgba(210,170,95,0.16) 0%, rgba(0,0,0,0) 60%), radial-gradient(900px 600px at 50% 50%, rgba(255,255,255,0.045) 0%, rgba(0,0,0,0) 58%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
              }}
            />
            {/* subtle grain */}
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.45%27/%3E%3C/svg%3E")',
              }}
            />
            {/* edge vignette */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  'radial-gradient(closest-side at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.92) 100%)',
              }}
            />
          </div>

          {/* Center premium card */}
          <div className="relative w-full max-w-[560px] px-6">
            <div className="rounded-3xl border border-white/10 bg-black/35 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="flex items-center justify-center gap-4">
                <img
                  src={LOGO_SRC}
                  alt="Kroba Cards"
                  className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-2xl border border-white/10 bg-black/30 p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                  loading="eager"
                  decoding="async"
                />
                <div className="text-center">
                  <div className="text-[12px] tracking-[0.35em] text-white/55">
                    COLLECTOR GALLERY
                  </div>
                  <div className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                    Kroba <span className="text-[#d2aa5f]">Cards</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-xs tracking-[0.25em] text-white/40">
                LOADING
              </div>

              <div className="mt-4 h-[7px] w-full overflow-hidden rounded-full bg-white/10">
                <div className="kc-bar h-full w-full origin-left rounded-full" />
              </div>

              <div className="mt-3 text-center text-[11px] text-white/35">
                Preparing experience…
              </div>
            </div>
          </div>

          <style jsx global>{`
            .kc-bar {
              /* GOLD ONLY — no blue */
              background: linear-gradient(
                90deg,
                rgba(210, 170, 95, 0.12) 0%,
                rgba(210, 170, 95, 0.85) 55%,
                rgba(255, 255, 255, 0.22) 100%
              );
              animation: kcbar var(--kc-splash-ms) linear forwards;
            }
            @keyframes kcbar {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
          `}</style>
        </div>
      )}

      {ready && children}
    </>
  );
}
