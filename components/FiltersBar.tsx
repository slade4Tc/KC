'use client';

import { CardCategory, CardStatus } from '@/lib/types';

export interface FilterState {
  search: string;
  category: 'all' | CardCategory;
  status: 'all' | CardStatus;
  grade: 'all' | string;
  sort: 'newest' | 'title-asc';
}

interface FiltersBarProps {
  filters: FilterState;
  categories: { slug: CardCategory; label: string }[];
  grades: string[];
  onChange: (next: FilterState) => void;
  onOpenMobile: () => void;
}

const statusOptions: { value: FilterState['status']; label: string }[] = [
  { value: 'all', label: 'All status' },
  { value: 'available', label: 'Available' },
  { value: 'showcase', label: 'Showcase' },
  { value: 'sold', label: 'Sold' }
];

export function FiltersBar({ filters, categories, grades, onChange, onOpenMobile }: FiltersBarProps) {
  return (
    <>
      <button onClick={onOpenMobile} className="mb-6 rounded-full border border-white/20 px-4 py-2 text-sm md:hidden">
        Filters
      </button>
      <div className="mb-6 hidden grid-cols-5 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid">
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search title"
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold/40"
        />
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as FilterState['category'] })}
          className="rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as FilterState['status'] })}
          className="rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm"
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <select
          value={filters.grade}
          onChange={(e) => onChange({ ...filters, grade: e.target.value })}
          className="rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm"
        >
          <option value="all">All grades</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as FilterState['sort'] })}
          className="rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="title-asc">Title A-Z</option>
        </select>
      </div>
    </>
  );
}
