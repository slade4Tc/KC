import cardsData from '@/data/cards.json';
import { categoriesConfig } from '@/config/categories';
import { Card, CardCategory, CardFilters, CardStatus } from '@/lib/types';

const categorySet = new Set<CardCategory>(['pokemon', 'soccer', 'nfl', 'one-piece', 'misc-sports', 'marvel']);

type RawCard = Omit<Card, 'status' | 'category'> & { status?: string; category?: string };

function normalizeStatus(status?: string): CardStatus {
  return (status ?? '').toLowerCase() === 'sold' ? 'sold' : 'available';
}

function normalizeCategory(category?: string): CardCategory {
  const value = (category ?? '').toLowerCase().trim() as CardCategory;
  return categorySet.has(value) ? value : 'misc-sports';
}

const cards: Card[] = (cardsData as RawCard[]).map((card) => ({
  ...card,
  status: normalizeStatus(card.status),
  category: normalizeCategory(card.category)
}));

export function getCards() {
  return cards;
}

export function getCardById(id: string) {
  return cards.find((card) => card.id === id);
}

export function getFeaturedCards() {
  const ranked = [...cards]
    .filter((card) => typeof card.featuredRank === 'number' && card.featuredRank! >= 1 && card.featuredRank! <= 8)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
    .slice(0, 8);

  if (ranked.length === 8) return ranked;

  const fallback = [...cards]
    .filter((card) => card.status === 'available' && !ranked.some((rankedCard) => rankedCard.id === card.id))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, 8 - ranked.length);

  return [...ranked, ...fallback];
}

export function getNewestCards() {
  return [...cards].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 6);
}

export function getGradeList() {
  return [...new Set(cards.map((card) => card.grade).filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b));
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
  return categoriesConfig.map((category) => ({
    ...category,
    count: cards.filter((card) => card.category === category.slug).length
  }));
}

export function getCollectionCards(slug: string) {
  return cards.filter((card) => card.category === slug);
}
