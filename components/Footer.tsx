import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 text-sm text-stone-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} Kroba Cards</p>
        <div className="flex gap-5">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
            Instagram
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
