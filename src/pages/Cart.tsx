import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import CartContext from '../contexts/cartContext';
import useCartItems, { setCartItems } from '../hooks/useCartItems';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton, CustomGrid, GridItem } from '../theme';
import { Product } from '../reducers/cartReducer';

const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const cart = useCartItems();
  const totalArray = cartItems.map((item: Product) => {
    return item.price * item.quantity;
  });
  const getTotal = totalArray.reduce(
    (acc: number, item: number) => acc + item,
    0
  );
  const deliveryPrice = 0;
  const discount = 3;

  useEffect(() => {
    dispatch({
      type: 'SET',
      products: cart,
    });
  }, []);

  return (
    <>
      <Box marginTop={5} textAlign={'center'}>
        <CustomGrid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 1, sm: 12 }}
          alignItems="center"
          sx={{
            visibility: { xs: 'hidden', sm: 'visible' },
            height: { xs: '1px', sm: 'auto' },
          }}
        >
          <GridItem item xs={1} sm={1}></GridItem>
          <GridItem item xs={1} sm={2}></GridItem>
          <GridItem item xs={1} sm={5}>
            Product
          </GridItem>
          <GridItem item xs={1} sm={1}>
            Price
          </GridItem>
          <GridItem item xs={1} sm={2}>
            Qunatity
          </GridItem>
          <GridItem item xs={1} sm={1}>
            Total
          </GridItem>
        </CustomGrid>
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 1, sm: 12 }}
          alignItems="center"
          paddingTop={2}
        >
          {cartItems.map((product: Product, index: number) => (
            <>
              <Grid item xs={1} sm={1} key={index}>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      dispatch({
                        type: 'DELETE',
                        productId: product.id,
                      });
                      setCartItems(
                        cartItems.filter(
                          (item: Product) => item.id !== product.id
                        )
                      );
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={1} sm={2}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: '140px', sm: 'auto' },
                  }}
                >
                  <img
                    src={product.image}
                    alt=""
                    style={{
                      maxWidth: '100%',
                      objectFit: 'cover',
                      maxHeight: '100%',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={1} sm={5} key={index}>
                <Box textAlign={'center'}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body1">
                    {product.details.substr(0, 100)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1} sm={1} key={index}>
                <Box>
                  <Typography variant="button" display="block" gutterBottom>
                    ${product.price}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1} sm={2} key={index}>
                <Box>
                  <TextField
                    id="outlined-number"
                    label="Quantity"
                    value={product.quantity}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: 'CHANGEQUANTITY',
                        quantity: parseInt(event.target.value),
                        productId: product.id,
                      });
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={1} sm={1} key={index}>
                <Box>
                  <Typography variant="button" display="block" gutterBottom>
                    ${product.quantity * product.price}
                  </Typography>
                </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
      <Box marginTop={5}>
        <Stack
          sx={{
            maxWidth: { xs: '100%', sm: '50%', md: '30%' },
            border: '1px solid #ccc',
            padding: '20px',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            textTransform={'uppercase'}
            marginBottom={2}
          >
            Card Totals
          </Typography>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginBottom={4}
          >
            <Grid item xs={6}>
              Subtotal
            </Grid>
            <Grid item xs={6}>
              ${getTotal.toFixed(2)}
            </Grid>
            <Grid item xs={6}>
              Delivery
            </Grid>
            <Grid item xs={6}>
              ${deliveryPrice.toFixed(2)}
            </Grid>
            <Grid item xs={6}>
              Discount
            </Grid>
            <Grid item xs={6}>
              ${discount.toFixed(2)}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              TOTAL
            </Grid>
            <Grid item xs={6}>
              ${getTotal + deliveryPrice + discount}
            </Grid>
          </Grid>
          <CustomButton variant="contained">Proceed to Checkout</CustomButton>
        </Stack>
      </Box>
    </>
  );
};

export default Cart;
