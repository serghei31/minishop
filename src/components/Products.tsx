import React from 'react';
import Filters from './Filters';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

interface Product {
  name: string;
  brand: string;
  price: number;
  color: string;
  discount?: number;
  rate: number;
  image: string;
}

interface Props {
  products: Product[];
}

const limit = 8;

interface ProductQuery {
  page: number;
  filter?: string;
  color?: string;
  price: number[];
}

const Products = ({ products }: Props) => {
  const [query, setQuery] = React.useState<ProductQuery>({
    page: 1,
    price: [0, 500],
  });

  if (query.filter)
    query.filter === 'highest'
      ? products.sort((a, b) => b.price - a.price)
      : products.sort((a, b) => a.price - b.price);

  query.color
    ? (products = products.filter((product) => product.color === query.color))
    : products;

  query.price
    ? (products = products.filter(
        (product) =>
          product.price > query.price[0] && product.price < query.price[1]
      ))
    : products;

  const prodLength = products.length;
  const count = Math.ceil(prodLength / limit);
  const lastPostIndex = query.page * limit;
  const skip = lastPostIndex - limit;
  const currentProducts = products.slice(skip, lastPostIndex);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setQuery({ ...query, page: value });
  };

  const slugify = (name: string) => {
    return name.toLowerCase().replaceAll(' ', '-');
  };

  return (
    <>
      <Filters
        onSort={(filter: string) => setQuery({ ...query, filter })}
        onColorChange={(color: string) =>
          setQuery({ ...query, color, page: 1 })
        }
        onPriceChange={(price: number[]) =>
          setQuery({ ...query, price, page: 1 })
        }
      />
      <Box paddingTop={5} paddingBottom={5}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          {currentProducts.map((item: Product, index) => (
            <Grid item xs={4} sm={4} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: { sm: 400, md: 345 } }}>
                <CardActionArea
                  href={`product/${slugify(item.name)}`}
                  sx={{
                    background:
                      'linear-gradient(90deg, rgba(241,241,241,1) 0%, rgba(238,238,238,1) 51%, rgba(240,240,240,1) 100%)',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent
                    sx={{ background: '#fff', padding: '1.5em 1em' }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                      >
                        {item.brand}
                      </Typography>
                      <Rating name="read-only" value={item.rate} readOnly />
                    </Stack>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <span
                        style={{
                          textDecoration: 'line-through',
                          color: '#D4C8D1',
                        }}
                      >
                        {item.discount ? `$${item.discount}` : ''}
                      </span>{' '}
                      ${item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack alignItems="center" marginTop={4}>
          <Pagination
            count={count}
            page={query.page}
            onChange={handlePagination}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </Box>
    </>
  );
};

export default Products;
