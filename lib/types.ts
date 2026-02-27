export type CardStatus = 'available' | 'showcase' | 'sold';

export type CardCategory = 'f1' | 'soccer' | 'baseball' | 'entertainment' | 'basketball' | 'showcase';

export interface Card {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CardCategory;
  year: number;
  status: CardStatus;
  grade: string;
  frontImage: string;
  gallery: string[];
  description: string;
  notes: string[];
  updatedAt: string;
  featured: boolean;
}

export interface CardFilters {
  search: string;
  category: 'all' | CardCategory;
  status: 'all' | CardStatus;
  grade: 'all' | string;
  sort: 'newest' | 'title-asc';
}
