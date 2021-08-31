import { CartActionsTypes } from '../contexts/cart/actions';
import { Variant } from './product-details';

export interface CartItem {
  name: string;
  qty: number;
  stock: number;
  variant: Variant;
}

export interface CartState {
  cart: CartItem[];
}

export interface CartContextState {
  cart: CartState;
  dispatchCart: React.Dispatch<CartActionsTypes>;
}
