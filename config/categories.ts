export const categoriesConfig = [
  {
    slug: 'pokemon',
    label: 'Pokemon',
    imageUrl: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772232243/pokemon_ipzyqo.png',
    description: 'Vintage and modern grails.'
  },
  {
    slug: 'soccer',
    label: 'Soccer',
    imageUrl: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772232239/soccer_qhcqlo.png',
    description: 'Club icons and global stars.'
  },
  {
    slug: 'nfl',
    label: 'NFL',
    imageUrl: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772232239/nfl_wxfij5.png',
    description: 'Rookies, autos, and legends.'
  },
  {
    slug: 'one-piece',
    label: 'One Piece',
    imageUrl: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772232241/onepiece_bab5eb.png',
    description: 'Top chase parallels and manga hits.'
  },
  {
    slug: 'misc-sports',
    label: 'Misc/Sports',
    imageUrl: 'https://res.cloudinary.com/dez5060kz/image/upload/v1772232237/misc_jez8g3.png',
    description: 'F1, baseball, basketball, and more.'
  },
  {
    slug: 'marvel',
    label: 'Marvel',
    imageUrl: 'ΒΑΛΕ_ΕΔΩ_ΤΟ_ΔΙΚΟ_ΣΟΥ_MARVEL_URL.png',
    description: 'Comic and cinematic signatures.'
  }
] as const;

export type CategorySlug = (typeof categoriesConfig)[number]['slug'];
