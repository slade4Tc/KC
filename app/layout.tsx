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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-stone-100">
        {/* Keep all app content above body overlays WITHOUT breaking positioning */}
        <div className="relative z-10">
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
