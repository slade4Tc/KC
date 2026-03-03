import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import SplashGate from '@/components/SplashGate';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

function BackgroundLayers() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Warm gold pools + vignette (same as your previous CSS) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 700px at 18% 22%, rgba(210, 170, 95, 0.14) 0%, rgba(0, 0, 0, 0) 55%), radial-gradient(1100px 700px at 82% 78%, rgba(210, 170, 95, 0.16) 0%, rgba(0, 0, 0, 0) 60%), radial-gradient(900px 600px at 50% 50%, rgba(255, 255, 255, 0.045) 0%, rgba(0, 0, 0, 0) 58%), radial-gradient(closest-side at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.92) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)'
        }}
      />

      {/* Subtle grain (same as previous CSS, no mix-blend for iOS safety) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")"
        }}
      />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-stone-100 bg-[#070606]">
        {/* Mobile-proof background (replaces body::before/after) */}
        <BackgroundLayers />

        {/* App wrapper above background + prevent horizontal jank */}
        <div className="relative z-10 overflow-x-hidden">
          <SplashGate ms={4000}>
            <Navbar />
            <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </SplashGate>
        </div>
      </body>
    </html>
  );
}