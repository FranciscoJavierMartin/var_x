import { RECENTLY_VIEWED } from '../constants/localStorage';
import { Product } from '../interfaces/product-details';

export const getRecentlyViewProducts = (): Product[] =>
  typeof window !== 'undefined'
    ? JSON.parse(window.localStorage.getItem(RECENTLY_VIEWED) || '[]')
    : [];
