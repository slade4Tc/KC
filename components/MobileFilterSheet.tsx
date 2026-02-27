'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CardCategory, CardStatus } from '@/lib/types';
import { FilterState } from '@/components/FiltersBar';

interface MobileFilterSheetProps {
  open: boolean;
  categories: { slug: CardCategory; label: string }[];
  grades: string[];
  value: FilterState;
  onClose: () => void;
  onApply: (value: FilterState) => void;
  onClear: () => void;
}

export function MobileFilterSheet({ open, categories, grades, value, onClose, onApply, onClear }: MobileFilterSheetProps) {
  const [draft, setDraft] = useState<FilterState>(value);

  useEffect(() => {
    setDraft(value);
  }, [value, open]);

  const set = <K extends keyof FilterState>(key: K, next: FilterState[K]) => setDraft((prev) => ({ ...prev, [key]: next }));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/60" />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border border-white/10 bg-[#191919] p-6"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-stone-400">Filters</p>
            <div className="space-y-3">
              <input value={draft.search} onChange={(e) => set('search', e.target.value)} placeholder="Search title" className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm" />
              <select value={draft.category} onChange={(e) => set('category', e.target.value as 'all' | CardCategory)} className="w-full rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm">
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.label}
                  </option>
                ))}
              </select>
              <select value={draft.status} onChange={(e) => set('status', e.target.value as 'all' | CardStatus)} className="w-full rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm">
                <option value="all">All status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
              <select value={draft.grade} onChange={(e) => set('grade', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm">
                <option value="all">All grades</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <select value={draft.sort} onChange={(e) => set('sort', e.target.value as FilterState['sort'])} className="w-full rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm">
                <option value="newest">Newest</option>
                <option value="title-asc">Title A-Z</option>
              </select>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  onClear();
                  onClose();
                }}
                className="flex-1 rounded-full border border-white/20 px-4 py-3 text-sm"
              >
                Clear all
              </button>
              <button
                onClick={() => {
                  onApply(draft);
                  onClose();
                }}
                className="flex-1 rounded-full bg-gold px-4 py-3 text-sm font-medium text-[#1a1509]"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
