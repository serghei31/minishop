import { Product } from '../reducers/cartReducer';

function useCartItems() {
  // getting stored cart items
  const temp = localStorage.getItem('cart');
  const savedCart = JSON.parse(temp as string);
  return savedCart || [];
}

export const setCartItems = (cartItems: Product[]) => {
  // storing cart items in local storage
  const temp = JSON.stringify(cartItems);
  localStorage.setItem('cart', temp);
};

export default useCartItems;
