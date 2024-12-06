import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InsuranceClaimPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    insurancePolicy: '',
    claimReason: '',
    insuranceAmount: '',
    documents: null,
  });

  const petData = {
    petName: "Coco",
    ownerName: "Sakshi Singh",
  }

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
        bgcolor: 'white', // Full-screen light orange background
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">PetChain</Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate("/pprofile")}
              sx={{ ml: 2 }}
            >
              My Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/insurance")}
              sx={{ ml: 2 }}
            >
              Insurance
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/pet-health")}
              sx={{ ml: 2 }}
            >
              Pet Health
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/ownership-transfer")}
              sx={{ ml: 2 }}
            >
              Ownership Transfer
            </Button>
            <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/", { replace: true });
            }}
            sx={{ ml: 2 }}
            >
            Logout
          </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Form Section */}
      <Container
        maxWidth="md"
        sx={{
          bgcolor: 'white', // Light orange color
          mt: 5,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Pet Insurance Claim
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              fullWidth
              label="Owner's Name"
              value={petData.ownerName}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pet's Name"
              value={petData.petName}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
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
              <TextField
                fullWidth
                name="insuranceAmount"
                label="Claim Amount"
                value={formData.insuranceAmount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  bgcolor: 'orange',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#D04E00',
                  },
                }}
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
                fullWidth
                sx={{
                  bgcolor: 'orange',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#D04E00',
                  },
                }}
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
