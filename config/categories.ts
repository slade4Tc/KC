import categoriesData from '@/data/categories.json';
import type { CardCategory } from '@/lib/types';

type CategoryConfig = {
  slug: CardCategory;
  label: string;
  imageUrl: string;
  description: string;
};

export const categoriesConfig = categoriesData as CategoryConfig[];
