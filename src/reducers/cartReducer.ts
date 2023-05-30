export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  details: string;
  quantity: number;
}

interface AddProducts {
  type: 'SET';
  products: Product[];
}

interface AddProduct {
  type: 'ADD';
  product: Product;
}

interface DeleteProduct {
  type: 'DELETE';
  productId: number;
}

interface ChangeQuantity {
  type: 'CHANGEQUANTITY';
  quantity: number;
  productId: number;
}

export type TakeAction =
  | AddProduct
  | DeleteProduct
  | AddProducts
  | ChangeQuantity;

const cartReducer = (state: Product[], action: TakeAction): Product[] => {
  switch (action.type) {
    case 'ADD':
      return [action.product, ...state];
    case 'SET':
      return action.products;
    case 'DELETE':
      return state.filter((product) => product.id !== action.productId);
    case 'CHANGEQUANTITY':
      state.map((product) => {
        if (product.id === action.productId) product.quantity = action.quantity;
      });
      return [...state];
    default:
      return state;
  }
};

export default cartReducer;
