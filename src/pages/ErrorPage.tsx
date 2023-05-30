import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Box, Typography } from '@mui/material';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Typography variant="h2" gutterBottom>
          Oops
        </Typography>
        <Typography variant="body1" gutterBottom>
          {isRouteErrorResponse(error)
            ? 'This page does not exist.'
            : 'An unexpected error occured.'}
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
