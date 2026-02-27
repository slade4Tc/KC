export type CardStatus = 'available' | 'sold';

export type CardCategory = 'pokemon' | 'soccer' | 'nfl' | 'one-piece' | 'misc-sports' | 'marvel';

export interface Card {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CardCategory;
  year?: number;
  status: CardStatus;
  grade?: string;
  serial?: string;
  tags?: string[];
  notes?: string[];
  frontImage: string;
  description: string;
  updatedAt: string;
  featuredRank?: number;
}

export interface CardFilters {
  search: string;
  category: 'all' | CardCategory;
  status: 'all' | CardStatus;
  grade: 'all' | string;
  sort: 'newest' | 'title-asc';
}
