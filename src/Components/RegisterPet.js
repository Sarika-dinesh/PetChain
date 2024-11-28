import React, { useState } from "react";
import { AppBar, Toolbar, Button, Container, TextField, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    petName: "",
    breed: "",
    age: "",
    gender: "",
    color: ""
  });

  const petData = {
    ownerName: "Sakshi Singh",
    ownerID: "456"
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("New Pet Added!");
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
            Register your Pet
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {[
                { name: "petName", label: "Pet Name" },
                { name: "breed", label: "Breed" },
                { name: "age", label: "Age" },
                { name: "gender", label: "Gender" },
                { name: "color", label: "Color" },
              ].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2}>
              {[
                { name: "ownerName", label: "Owner's Name" },
                { name: "ownerID", label: "Owner's ID" },
              ].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    label={field.label}
                    value={petData[field.name]}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "orange" }}>
                Register
              </Button>
            </Grid>
          </Box>
        </Container>
      </Box >
    </Box >
  );
};

export default RegisterPet;