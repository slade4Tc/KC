import cardsData from '@/data/cards.json';
import { categoryConfig } from '@/config/categories';
import { Card, CardCategory, CardFilters, CardStatus } from '@/lib/types';

const categorySet = new Set<CardCategory>(['f1', 'soccer', 'baseball', 'entertainment', 'basketball', 'showcase']);

type RawCard = Omit<Card, 'status' | 'category'> & { status?: string; category?: string };

function normalizeStatus(status?: string): CardStatus {
  const value = (status ?? '').toLowerCase().trim();
  if (value === 'sold') return 'sold';
  // showcase or unknown values normalize to available
  return 'available';
}

function normalizeCategory(category?: string): CardCategory {
  const value = (category ?? '').toLowerCase().trim();
  return categorySet.has(value as CardCategory) ? (value as CardCategory) : 'showcase';
}

const cards: Card[] = (cardsData as RawCard[]).map((card) => ({
  ...card,
  category: normalizeCategory(card.category),
  status: normalizeStatus(card.status)
}));

export function getCards() {
  return cards;
}

export function getCardById(id: string) {
  return cards.find((card) => card.id === id);
}

export function getFeaturedCards() {
  const ranked = [...cards]
    .filter((card) => typeof card.featuredRank === 'number' && card.featuredRank >= 1 && card.featuredRank <= 8)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
    .slice(0, 8);

  if (ranked.length === 8) return ranked;

  const fill = [...cards]
    .filter((card) => card.status === 'available' && !ranked.some((item) => item.id === card.id))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, 8 - ranked.length);

  return [...ranked, ...fill].slice(0, 8);
}

export function getNewestCards() {
  return [...cards].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 6);
}

export function getGradeList() {
  return [...new Set(cards.map((card) => card.grade))].sort((a, b) => a.localeCompare(b));
}

export function filterCards(input: Card[], filters: CardFilters) {
  const search = filters.search.toLowerCase().trim();
  return input
    .filter((card) => {
      if (search && !`${card.name} ${card.subtitle}`.toLowerCase().includes(search)) return false;
      if (filters.category !== 'all' && card.category !== filters.category) return false;
      if (filters.status !== 'all' && card.status !== filters.status) return false;
      if (filters.grade !== 'all' && card.grade !== filters.grade) return false;
      return true;
    })
    .sort((a, b) => (filters.sort === 'title-asc' ? a.name.localeCompare(b.name) : +new Date(b.updatedAt) - +new Date(a.updatedAt)));
}

export function getCategoryCounts() {
  return categoryConfig.map((category) => ({
    ...category,
    count: cards.filter((card) => card.category === category.slug).length
  }));
}

export function getCollectionCards(slug: string) {
  return cards.filter((card) => card.category === slug);
}
