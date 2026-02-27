'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardGrid } from '@/components/CardGrid';
import { FilterState, FiltersBar } from '@/components/FiltersBar';
import { MobileFilterSheet } from '@/components/MobileFilterSheet';
import { categoriesConfig } from '@/config/categories';
import { filterCards, getCards, getGradeList } from '@/lib/cards';

interface CollectionsViewProps {
  title: string;
  description: string;
  initialFilters: FilterState;
  clearCategoryHref?: string;
}

const blankFilters: FilterState = {
  search: '',
  category: 'all',
  status: 'all',
  grade: 'all',
  sort: 'newest'
};

export function CollectionsView({ title, description, initialFilters, clearCategoryHref }: CollectionsViewProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [open, setOpen] = useState(false);

  const allCards = getCards();
  const grades = getGradeList();
  const filtered = useMemo(() => filterCards(allCards, filters), [allCards, filters]);

  const chips = [
    filters.search ? { key: 'search', label: `Search: ${filters.search}` } : null,
    filters.category !== 'all' ? { key: 'category', label: `Category: ${filters.category}` } : null,
    filters.status !== 'all' ? { key: 'status', label: `Status: ${filters.status}` } : null,
    filters.grade !== 'all' ? { key: 'grade', label: `Grade: ${filters.grade}` } : null,
    filters.sort !== 'newest' ? { key: 'sort', label: 'Sort: Title' } : null
  ].filter(Boolean) as { key: keyof FilterState; label: string }[];

  const clearFilter = (key: keyof FilterState) => {
    if (key === 'category' && clearCategoryHref) {
      router.push(clearCategoryHref);
      return;
    }
    setFilters((prev) => ({ ...prev, [key]: blankFilters[key] }));
  };

  return (
    <section className="py-8 sm:py-12">
      <h1 className="mb-2 text-4xl font-semibold">{title}</h1>
      <p className="mb-5 text-stone-400">{description}</p>
      <FiltersBar
        filters={filters}
        categories={categoriesConfig.map((item) => ({ slug: item.slug, label: item.label }))}
        grades={grades}
        onChange={setFilters}
        onOpenMobile={() => setOpen(true)}
      />
      {!!chips.length && (
        <div className="mb-6 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => clearFilter(chip.key)}
              className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs text-gold"
              aria-label={chip.key === 'category' ? 'Clear category filter' : `Clear ${chip.key} filter`}
            >
              {chip.label} ×
            </button>
          ))}
        </div>
      )}
      <CardGrid cards={filtered} />
      <MobileFilterSheet
        open={open}
        categories={categoriesConfig.map((item) => ({ slug: item.slug, label: item.label }))}
        grades={grades}
        value={filters}
        onClose={() => setOpen(false)}
        onApply={setFilters}
        onClear={() => setFilters(blankFilters)}
      />
    </section>
  );
}
