import { PageTransition } from '@/components/PageTransition';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="py-10 sm:py-14">
        <h1 className="mb-4 text-4xl font-semibold">Contact</h1>
        <p className="mb-8 max-w-2xl text-stone-300">For inquiries, private sourcing, or bespoke collector requests, contact us directly.</p>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="block text-gold hover:underline">
            Instagram Direct
          </a>
          <a href={`mailto:${siteConfig.email}`} className="block text-gold hover:underline">
            {siteConfig.email}
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
