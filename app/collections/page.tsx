import { CollectionsView } from '@/components/CollectionsView';
import { FilterState } from '@/components/FiltersBar';

const initialFilters: FilterState = {
  search: '',
  category: 'all',
  status: 'all',
  grade: 'all',
  sort: 'newest'
};

export default function CollectionsPage() {
  return (
    <CollectionsView
      title="Collections"
      description="Browse all inventory by category, status, grade, and latest additions."
      initialFilters={initialFilters}
    />
  );
}
