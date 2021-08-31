import { CartItem } from '../../interfaces/cart';
import { Variant } from '../../interfaces/product-details';

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
}

export interface AddToCartType {
  type: CartActionTypes.ADD_TO_CART;
  payload: CartItem;
}

export interface RemoveFromCartType {
  type: CartActionTypes.REMOVE_FROM_CART;
  payload: {
    variant: Variant;
    qty: number;
  };
}

export interface ClearCartType {
  type: CartActionTypes.CLEAR_CART;
}

export type CartActionsTypes =
  | AddToCartType
  | RemoveFromCartType
  | ClearCartType;

export const addToCart = (
  variant: Variant,
  qty: number,
  name: string,
  stock: number
): AddToCartType => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: { variant, qty, name, stock },
});

export const removeFromCart = (
  variant: Variant,
  qty: number
): RemoveFromCartType => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: { variant, qty },
});

export const clearCart = (): ClearCartType => ({
  type: CartActionTypes.CLEAR_CART,
});
