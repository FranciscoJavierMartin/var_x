import { CartActionsTypes } from '../contexts/cart/actions';

export interface CartState {
  cart: any[];
}

export interface CartContextState {
  cart: CartState;
  dispatchCart: React.Dispatch<CartActionsTypes>;
}
