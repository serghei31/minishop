import {
  Box,
  Button,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { product } from '../assets/product.json';
import React, { useContext, useEffect } from 'react';
import { CustomButton, RatingBlock } from '../theme';
import CartContext from '../contexts/cartContext';
import { setCartItems } from '../hooks/useCartItems';

interface Product {
  name: string;
  brand: string;
  totalRatings: number;
  totalSold: number;
  price: number;
  rate: number;
  image: string;
  details: string;
  availablePieces: number;
}

const Product = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [pieces, setPieces] = React.useState(product.availablePieces);
  const { cartItems, dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    setPieces(pieces - quantity);
    dispatch({
      type: 'ADD',
      product: { ...product, quantity, id: Math.floor(Math.random() * 100) },
    });
    setQuantity(1);
  };

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);

  return (
    <Grid
      container
      columns={{ xs: 1, sm: 16, md: 16 }}
      sx={{ margin: '24px 0' }}
    >
      <Grid item xs={1} sm={6} md={8}>
        <Box
          sx={{
            background:
              'linear-gradient(90deg, rgba(241,241,241,1) 0%, rgba(238,238,238,1) 51%, rgba(240,240,240,1) 100%)',
          }}
        >
          <img src={product.image} alt="" style={{ maxWidth: '100%' }} />
        </Box>
      </Grid>
      <Grid item xs={1} sm={10} md={8}>
        <Box margin={2}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>
          <Stack direction="row" spacing={2} marginBottom={3}>
            <Typography variant="body1">{product.rate.toFixed(1)}</Typography>
            <Rating name="read-only" value={product.rate} readOnly />
            <RatingBlock>
              {product.totalRatings}
              <span>Rating</span>
            </RatingBlock>
            <RatingBlock>
              {product.totalSold}
              <span>Sold</span>
            </RatingBlock>
          </Stack>
          <Typography variant="h3" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body2">{product.details}</Typography>
        </Box>
        <Stack margin={2} direction={'row'}>
          <Button
            variant="outlined"
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            <RemoveIcon />
          </Button>
          <TextField
            id="outlined-number"
            label="Qunatity"
            type="number"
            value={quantity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQuantity(parseInt(event.target.value));
            }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ margin: '0 10px' }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            <AddIcon />
          </Button>
        </Stack>
        <Box margin={2}>
          <Typography variant="body1" marginBottom={3}>
            {pieces} piece available
          </Typography>
          <CustomButton variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </CustomButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
