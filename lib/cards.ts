import cardsData from '@/data/cards.json';
import { categoryConfig } from '@/config/categories';
import { Card, CardCategory, CardFilters, CardStatus } from '@/lib/types';

const categorySet = new Set<CardCategory>(['f1', 'soccer', 'baseball', 'entertainment', 'basketball', 'showcase']);

type RawCard = Omit<Card, 'status' | 'category'> & { status?: string; category?: string };

function normalizeStatus(status?: string): CardStatus {
  const value = (status ?? '').toLowerCase().trim();
  if (value === 'available' || value === 'showcase' || value === 'sold') return value;
  if (!value || value === 'unknown') return 'available';
  return 'showcase';
}

function normalizeCategory(category?: string): CardCategory {
  const value = (category ?? '').toLowerCase().trim();
  if (categorySet.has(value as CardCategory)) return value as CardCategory;
  return 'showcase';
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
  return cards.filter((card) => card.featured).slice(0, 6);
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
    .sort((a, b) => {
      if (filters.sort === 'title-asc') return a.name.localeCompare(b.name);
      return +new Date(b.updatedAt) - +new Date(a.updatedAt);
    });
}

export function getCategoryCounts() {
  return categoryConfig.map((category) => ({
    ...category,
    count:
      category.slug === 'showcase'
        ? cards.filter((card) => card.status === 'showcase').length
        : cards.filter((card) => card.category === category.slug).length
  }));
}

export function getCardsForCollectionSlug(slug: string) {
  if (slug === 'showcase') return cards.filter((card) => card.status === 'showcase');
  if (categorySet.has(slug as CardCategory)) return cards.filter((card) => card.category === slug);
  return [];
}
