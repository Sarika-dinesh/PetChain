import React, { useState } from "react";
import { AppBar, Toolbar, Button, Container, TextField, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddInsurancePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    insurancePolicy: "",
    coverageDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Insurance Added!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Covers the full height of the viewport
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">PetChain</Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate("/profile")}
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
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1, // Ensures the content stretches to fill available space
          padding: 3,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            bgcolor: "white", // Form container with white background
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
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    bgcolor: "orange",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#e55a00", // Slightly darker shade on hover
                    },
                  }}
                >
                  Add Insurance
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AddInsurancePage;
