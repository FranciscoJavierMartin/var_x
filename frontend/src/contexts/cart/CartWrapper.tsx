import React, { useReducer, createContext } from 'react';
import { CART_STORAGED } from '../../constants/localStorage';
import { CartContextState } from '../../interfaces/cart';
import cartReducer from './reducer';

export const CartContext = createContext<CartContextState>(
  {} as CartContextState
);

export const CartWrapper: React.FC = ({ children }) => {
  const storedCart =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(CART_STORAGED)!)
      : null;
  const [cart, dispatchCart] = useReducer(cartReducer, {
    cart: storedCart || [],
  });

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};
