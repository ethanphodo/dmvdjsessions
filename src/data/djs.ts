import type { DJ } from '../types'

export const djs: DJ[] = [
  {
    id: 'dj-001',
    name: 'Marcus Cole',
    slug: 'marcus-cole',
    bio: 'DC native spinning deep house since 2015. Known for seamless blends and warm, soulful selections that make you move.',
    image: '/images/djs/marcus-cole.jpg',
    genres: ['deep-house', 'house'],
    location: 'dc',
    socials: {
      instagram: 'https://instagram.com/marcuscole',
      soundcloud: 'https://soundcloud.com/marcuscole',
      mixcloud: 'https://mixcloud.com/marcuscole',
    },
    featured: true,
    status: 'active',
  },
  {
    id: 'dj-002',
    name: 'Luna Martinez',
    slug: 'luna-martinez',
    bio: 'Tech house specialist from Silver Spring. Her high-energy sets bring the underground warehouse vibes to every session.',
    image: '/images/djs/luna-martinez.jpg',
    genres: ['tech-house', 'minimal'],
    location: 'md',
    socials: {
      instagram: 'https://instagram.com/lunamartinez',
      soundcloud: 'https://soundcloud.com/lunamartinez',
    },
    featured: false,
    status: 'active',
  },
  {
    id: 'dj-003',
    name: 'Kai Thompson',
    slug: 'kai-thompson',
    bio: 'Arlington-based selector bringing Afro house rhythms and infectious grooves. Resident at Capitol City Sessions.',
    image: '/images/djs/kai-thompson.jpg',
    genres: ['afro-house', 'house'],
    location: 'va',
    socials: {
      instagram: 'https://instagram.com/kaithompson',
      mixcloud: 'https://mixcloud.com/kaithompson',
    },
    featured: true,
    status: 'active',
  },
  {
    id: 'dj-004',
    name: 'Zara Okonkwo',
    slug: 'zara-okonkwo',
    bio: 'Progressive house maven from Georgetown. Creates hypnotic journeys through melodic soundscapes.',
    image: '/images/djs/zara-okonkwo.jpg',
    genres: ['progressive', 'melodic'],
    location: 'dc',
    socials: {
      instagram: 'https://instagram.com/zaraokonkwo',
      soundcloud: 'https://soundcloud.com/zaraokonkwo',
      spotify: 'https://open.spotify.com/artist/zaraokonkwo',
    },
    featured: false,
    status: 'active',
  },
  {
    id: 'dj-005',
    name: 'Devon Price',
    slug: 'devon-price',
    bio: 'Baltimore transplant bringing raw, dark techno influences to the DMV house scene. Expect the unexpected.',
    image: '/images/djs/devon-price.jpg',
    genres: ['techno', 'tech-house'],
    location: 'md',
    socials: {
      instagram: 'https://instagram.com/devonprice',
      soundcloud: 'https://soundcloud.com/devonprice',
    },
    featured: false,
    status: 'active',
  },
  {
    id: 'dj-006',
    name: 'Nina Reyes',
    slug: 'nina-reyes',
    bio: 'Disco and nu-disco purveyor from Bethesda. Brings the funk and makes every set feel like a celebration.',
    image: '/images/djs/nina-reyes.jpg',
    genres: ['disco', 'house'],
    location: 'md',
    socials: {
      instagram: 'https://instagram.com/ninareyes',
      mixcloud: 'https://mixcloud.com/ninareyes',
    },
    featured: true,
    status: 'active',
  },
]

export const getFeaturedDJs = (): DJ[] => djs.filter((dj) => dj.featured)
export const getDJById = (id: string): DJ | undefined => djs.find((dj) => dj.id === id)
export const getDJBySlug = (slug: string): DJ | undefined => djs.find((dj) => dj.slug === slug)
export const getDJsByGenre = (genre: string): DJ[] =>
  djs.filter((dj) => dj.genres.includes(genre as DJ['genres'][number]))
export const getDJsByLocation = (location: string): DJ[] =>
  djs.filter((dj) => dj.location === location)
export const getAllDJs = (): DJ[] => djs
