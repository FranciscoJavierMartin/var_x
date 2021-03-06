import { CART_STORAGED } from '../../constants/localStorage';
import { CartItem, CartState } from '../../interfaces/cart';
import { CartActionsTypes, CartActionTypes } from './actions';

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_STORAGED, JSON.stringify(cart));
}

export default function cartReducer(
  state: CartState,
  action: CartActionsTypes
): CartState {
  let newState: CartState;

  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(
        item => item.variant === action.payload.variant
      );
      let newCartAddItem: CartItem[] = [];

      if (existingItemIndex === -1) {
        newCartAddItem = [...state.cart, action.payload];
      } else {
        let newQty = state.cart[existingItemIndex].qty + action.payload.qty;

        if (newQty > action.payload.stock) {
          newQty = action.payload.stock;
        }

        newCartAddItem = [...state.cart];
        newCartAddItem[existingItemIndex] = {
          ...state.cart[existingItemIndex],
          qty: newQty,
        };
      }

      saveCart(newCartAddItem);
      newState = { ...state, cart: newCartAddItem };
      break;
    case CartActionTypes.REMOVE_FROM_CART:
      const existingIndex = state.cart.findIndex(
        item => item.variant === action.payload.variant
      );
      const newQty = state.cart[existingIndex].qty - action.payload.qty;
      let newCartRemoveItem: CartItem[] = [];

      if (newQty <= 0) {
        newCartRemoveItem = state.cart.filter(
          item => item.variant !== action.payload.variant
        );
      } else {
        newCartRemoveItem = [...state.cart];
        newCartRemoveItem[existingIndex] = {
          ...state.cart[existingIndex],
          qty: newQty,
        };
      }

      saveCart(newCartRemoveItem);
      newState = { ...state, cart: newCartRemoveItem };
      break;
    case CartActionTypes.CLEAR_CART:
      localStorage.removeItem(CART_STORAGED);
      newState = { ...state, cart: [] };
      break;
    case CartActionTypes.CHANGE_FREQUENCY:
      const existingIndexForChange = state.cart.findIndex(
        item => item.variant === action.payload.variant
      );
      const newCart = [...state.cart];
      newCart[existingIndexForChange].subscription = action.payload.frequency;
      saveCart(newCart);
      newState = { ...state, cart: newCart };
      break;
    case CartActionTypes.TOGGLE_SUBSCRIPTION:
      const newCartForToggle = [...state.cart];
      const existingIndexForToggle = state.cart.findIndex(
        item => item.variant === action.payload.variant
      );
      const existingSubscription =
        !!newCartForToggle[existingIndexForToggle].subscription;

      if (existingSubscription) {
        delete newCartForToggle[existingIndexForToggle].subscription;
      } else {
        newCartForToggle[existingIndexForToggle].subscription =
          action.payload.frequency;
      }
      newState = { ...state, cart: newCartForToggle };
      saveCart(newCartForToggle);
      break;
    default:
      newState = state;
  }

  return newState;
}
