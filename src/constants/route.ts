import type { Route } from 'next';

export const ROUTE: Record<string, URL | Route<string>> = {
  index: '/',
  reflections: '/reflections',
  whale: '/projects/whale',
  stillHuman: '/projects/still-human',
  tripFlow: '/projects/tripflow',
};
