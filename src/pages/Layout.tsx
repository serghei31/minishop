import { Outlet } from 'react-router-dom';
import NavBar from '.././components/NavBar';
import { Container } from '@mui/material';
import { useReducer } from 'react';
import cartReducer from '../reducers/cartReducer';
import CartContext from '../contexts/cartContext';

function App() {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#F8F9FA' }}>
        <NavBar />
        <div>
          <Outlet />
        </div>
      </Container>
    </CartContext.Provider>
  );
}

export default App;
