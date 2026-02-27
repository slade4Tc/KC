export const categoryConfig = [
  {
    slug: 'f1',
    label: 'F1',
    image: 'https://res.cloudinary.com/demo/image/upload/v1690001010/categories/f1.jpg',
    description: 'Racing legends and championship moments.'
  },
  {
    slug: 'soccer',
    label: 'Soccer',
    image: 'https://res.cloudinary.com/demo/image/upload/v1690001011/categories/soccer.jpg',
    description: 'Iconic clubs and international stars.'
  },
  {
    slug: 'baseball',
    label: 'Baseball',
    image: 'https://res.cloudinary.com/demo/image/upload/v1690001012/categories/baseball.jpg',
    description: 'Hall of fame legends and modern standouts.'
  },
  {
    slug: 'entertainment',
    label: 'Entertainment',
    image: 'https://res.cloudinary.com/demo/image/upload/v1690001013/categories/entertainment.jpg',
    description: 'Cinema, music, and pop culture grails.'
  },
  {
    slug: 'basketball',
    label: 'Basketball',
    image: 'https://res.cloudinary.com/demo/image/upload/v1690001014/categories/basketball.jpg',
    description: 'Rookies, signatures, and championship icons.'
  },
  {
    slug: 'showcase',
    label: 'Showcase',
    image: 'https://res.cloudinary.com/demo/image/upload/v1690001015/categories/showcase.jpg',
    description: 'Display-selected highlights from the vault.'
  }
] as const;

export type CategorySlug = (typeof categoryConfig)[number]['slug'];
