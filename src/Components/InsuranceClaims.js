import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const InsuranceClaimPage = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    insurancePolicy: '',
    claimReason: '',
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Claim Submitted!');
  };

  return (
    <Box
      sx={{
        bgcolor: 'orange', // Full-screen orange background
        minHeight: '100vh', // Ensure it covers the entire viewport
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Container
        maxWidth="md" // Increased width to medium
        sx={{
          bgcolor: 'white',
          p: 5, // Increased padding
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Pet Insurance Claim
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
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
                name="claimReason"
                label="Reason for Claim"
                multiline
                rows={4}
                value={formData.claimReason}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Documents
                <input
                  type="file"
                  hidden
                  name="documents"
                  onChange={handleChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Claim
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default InsuranceClaimPage;
