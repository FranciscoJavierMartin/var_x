import { CartItem } from '../interfaces/cart';

export const calculateNumberOfItemsCart = (cart: CartItem[]): number =>
  cart.reduce((acc: number, item: CartItem) => item.qty + acc, 0);

export const calculateTotalPrice = (cart: CartItem[]): number =>
  cart.reduce(
    (total: number, item: CartItem) => item.qty * item.variant.price + total,
    0
  );
