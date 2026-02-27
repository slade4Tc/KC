export const categoryConfig = [
  {
    slug: 'f1',
    label: 'F1',
    image: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772220437/F1-Logo_vzlra4.jpg',
    description: 'Racing legends and championship moments.'
  },
  {
    slug: 'soccer',
    label: 'Soccer',
    image: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772220437/Soccer-player-making-sliding-tackle_xotozr.webp',
    description: 'Iconic clubs and international stars.'
  },
  {
    slug: 'baseball',
    label: 'Baseball',
    image: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772220437/09526-scitech2-baseball2_Widescreen_cbknw3.webp',
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
    image: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772220437/vn1phbbhku1itqb6jglx_zdpq0e.webp',
    description: 'Rookies, signatures, and championship icons.'
  },

] as const;

export type CategorySlug = (typeof categoryConfig)[number]['slug'];
