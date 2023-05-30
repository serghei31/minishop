import Heading from '../components/Heading';
import Products from '../components/Products';
import { products } from '../assets/products.json';

const Homepage = () => {
  return (
    <>
      <Heading />
      <Products products={products} />
    </>
  );
};

export default Homepage;
