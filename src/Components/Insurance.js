import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'orange',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" mb={4} color="white">
        Welcome to Pet Insurance
      </Typography>
      <Button
        variant="outlined"
        onClick={() => navigate('/add-insurance')}
        sx={{
          mb: 2,
          width: 200,
          bgcolor: 'white',
          color: 'orange',
          border: '2px solid orange',
          '&:hover': {
            bgcolor: 'orange',
            color: 'white',
          },
        }}
      >
        Add Insurance
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate('/claim-insurance')}
        sx={{
          width: 200,
          bgcolor: 'white',
          color: 'orange',
          border: '2px solid orange',
          '&:hover': {
            bgcolor: 'orange',
            color: 'white',
          },
        }}
      >
        Claim Insurance
      </Button>
    </Box>
  );
};

export default MainPage;
