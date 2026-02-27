import { PageTransition } from '@/components/PageTransition';

export default function AuthenticityPage() {
  return (
    <PageTransition>
      <section className="py-10 sm:py-14">
        <h1 className="mb-6 text-4xl font-semibold">Authenticity</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Verification', 'Serial checks and grader database matching are completed before listing.'],
            ['Condition', 'Cards are stored in UV-protected, humidity-managed environments.'],
            ['Shipping', 'Insured packaging and signature-required handoff for every order.']
          ].map(([title, body]) => (
            <article key={title} className="glass rounded-2xl p-6">
              <h2 className="mb-3 text-lg font-semibold">{title}</h2>
              <p className="text-sm text-stone-300">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
