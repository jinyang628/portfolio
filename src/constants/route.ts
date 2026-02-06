import type { Route } from 'next';

export const ROUTE: Record<string, URL | Route<string>> = {
  index: '/',
  cv: '/cv',
  notes: '/notes',
};
