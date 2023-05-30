import { Button, Grid, Typography, createTheme, styled } from '@mui/material';

export const CustomButton = styled(Button)({
  borderRadius: '25px',
  padding: '15px 50px',
});

export const RatingBlock = styled(Typography)({
  ' > span': {
    color: '#DACB92',
    marginLeft: '5px',
  },
});

export const GridItem = styled(Grid)({
  color: '#fff',
  paddingTop: '0px !important',
});

export const CustomGrid = styled(Grid)({
  backgroundColor: '#DACB92',
  padding: '1rem 0',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#343A3F',
    },
    secondary: {
      main: '#DACB92',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000',
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
