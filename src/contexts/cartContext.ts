import { Dispatch } from 'react';
import { Product, TakeAction } from '../reducers/cartReducer';
import React from 'react';

interface CartContextType {
  cartItems: Product[];
  dispatch: Dispatch<TakeAction>;
}

const CartContext = React.createContext<CartContextType>({} as CartContextType);

export default CartContext;
