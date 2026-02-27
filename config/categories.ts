import categories from '@/data/categories.json';

export const categoryConfig = categories as {
  slug: 'f1' | 'soccer' | 'baseball' | 'entertainment' | 'basketball' | 'showcase';
  label: string;
  image?: string;
  description?: string;
}[];

export type CategorySlug = (typeof categoryConfig)[number]['slug'];
