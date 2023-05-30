import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import Product from './pages/Product';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'product/:slug', element: <Product /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
]);

export default router;
