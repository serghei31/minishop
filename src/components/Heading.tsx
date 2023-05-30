import { Box, Typography } from '@mui/material';

const Heading = () => {
  return (
    <Box sx={{ padding: '30px 24px', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Products
      </Typography>
      <Typography variant="body1" gutterBottom>
        Check our latest products. we have the most modern products in the
        market
      </Typography>
    </Box>
  );
};

export default Heading;
