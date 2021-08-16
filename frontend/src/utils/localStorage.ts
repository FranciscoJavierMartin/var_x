import { RECENTLY_VIEWED } from '../constants/localStorage';
import { Product } from '../interfaces/product-details';

export const getRecentlyViewProducts = (): Product[] =>
  JSON.parse(window.localStorage.getItem(RECENTLY_VIEWED) || '[]');
