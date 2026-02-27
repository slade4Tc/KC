import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { categoryConfig } from '@/config/categories';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#131313]/80 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Brand</p>
          <h3 className="mt-3 text-lg font-semibold tracking-[0.12em]">KROBA CARDS</h3>
          <p className="mt-3 text-sm text-stone-400">Curated grails with premium presentation and collector-first service.</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-300">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Categories</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-300">
            {categoryConfig.map((category) => (
              <li key={category.slug}>
                <Link href={`/collections/${category.slug}`} className="hover:text-white">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Connect</p>
          <div className="mt-3 flex flex-col gap-3">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10">
              Instagram
            </a>
            <a href={`mailto:${siteConfig.email}`} className="rounded-full border border-white/20 px-4 py-2 text-sm text-stone-200 hover:bg-white/10">
              Email
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone-500">© {new Date().getFullYear()} Kroba Cards. All rights reserved.</div>
    </footer>
  );
}
