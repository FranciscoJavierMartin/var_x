import { CartItem } from '../../interfaces/cart';
import { Variant } from '../../interfaces/product-details';

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  CHANGE_FREQUENCY = 'CHANGE_FREQUENCY',
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

export interface ChangeFrequencyType {
  type: CartActionTypes.CHANGE_FREQUENCY;
  payload: {
    variant: Variant;
    frequency: string;
  };
}

export type CartActionsTypes =
  | AddToCartType
  | RemoveFromCartType
  | ClearCartType
  | ChangeFrequencyType;

export const addToCart = (
  variant: Variant,
  qty: number,
  name: string,
  stock: number,
  subscription: string
): AddToCartType => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: { variant, qty, name, stock, subscription },
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

export const changeFrequency = (
  variant: Variant,
  frequency: string
): ChangeFrequencyType => ({
  type: CartActionTypes.CHANGE_FREQUENCY,
  payload: { variant, frequency },
});
