import { notFound } from 'next/navigation';
import { CollectionsView } from '@/components/CollectionsView';
import { PageTransition } from '@/components/PageTransition';
import { FilterState } from '@/components/FiltersBar';
import { categoryConfig } from '@/config/categories';

export function generateStaticParams() {
  return categoryConfig.map((c) => ({ slug: c.slug }));
}

function getInitialFilters(slug: string): FilterState {
  return { search: '', category: slug as FilterState['category'], status: 'all', grade: 'all', sort: 'newest' };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const selected = categoryConfig.find((item) => item.slug === params.slug);
  if (!selected) notFound();

  return (
    <PageTransition>
      <CollectionsView
        title={selected.label}
        description="Refine this collection using search, category, status, grade, and sorting."
        initialFilters={getInitialFilters(params.slug)}
      />
    </PageTransition>
  );
}
