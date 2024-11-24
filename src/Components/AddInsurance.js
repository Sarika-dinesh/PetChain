import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';

const AddInsurancePage = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    insurancePolicy: '',
    coverageDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Insurance Added!');
  };

  return (
    <Box
      sx={{
        bgcolor: 'orange', // Full-screen orange background
        minHeight: '100vh', // Covers the full height of the viewport
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: 'white', // Form container with white background
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add Pet Insurance
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="ownerName"
                label="Owner's Name"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="petName"
                label="Pet's Name"
                value={formData.petName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="insurancePolicy"
                label="Insurance Policy Number"
                value={formData.insurancePolicy}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="coverageDetails"
                label="Coverage Details"
                multiline
                rows={4}
                value={formData.coverageDetails}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Insurance
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AddInsurancePage;
