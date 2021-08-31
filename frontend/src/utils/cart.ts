import { CartItem } from '../interfaces/cart';

export const calculateNumberOfItemsCart = (cart: CartItem[]): number =>
  cart.reduce((acc: number, item: CartItem) => item.qty + acc, 0);
