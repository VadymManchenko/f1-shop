import type { Team, Category } from '@/types/domain';

export const TEAM_LABEL: Record<Team, string> = {
  ferrari: 'Ferrari',
  mercedes: 'Mercedes',
  redbull: 'Red Bull',
  mclaren: 'McLaren',
  alpine: 'Alpine',
  aston: 'Aston Martin',
  williams: 'Williams',
  haas: 'Haas',
  rb: 'RB',
  sauber: 'Sauber',
};

export const TEAM_ACCENT: Record<Team, string> = {
  ferrari: '#DC0000',
  mercedes: '#00D2BE',
  redbull: '#1E41FF',
  mclaren: '#FF8700',
  alpine: '#0090FF',
  aston: '#006F62',
  williams: '#005AFF',
  haas: '#B6BABD',
  rb: '#6692FF',
  sauber: '#52E252',
};

export const CATEGORY_LABEL: Record<Category, string> = {
  cap: 'Кепка',
  tshirt: 'Футболка',
  hoodie: 'Худі',
  jacket: 'Куртка',
  polo: 'Поло',
  mug: 'Кухоль',
  keychain: 'Брелок',
  poster: 'Постер',
  lanyard: 'Ланьярд',
  sunglasses: 'Окуляри',
  model: 'Модель',
};

export const ALL_TEAMS: Team[] = [
  'ferrari',
  'mercedes',
  'redbull',
  'mclaren',
  'aston',
  'alpine',
  'williams',
  'haas',
  'rb',
  'sauber',
];

export const ALL_CATEGORIES: Category[] = [
  'cap',
  'tshirt',
  'hoodie',
  'jacket',
  'polo',
  'mug',
  'keychain',
  'poster',
  'lanyard',
  'sunglasses',
];
