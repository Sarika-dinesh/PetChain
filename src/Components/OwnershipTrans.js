import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OwnershipTransfer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const petData = {
    name: "Coco",
    gender: "Female",
    age: "2",
    breed: "Cocker Spaniel",
    ownerName: "Sakshi Singh",
    emailid: "skhsingh@ucdavis.edu",
    phoneNumber: "(530) 123-8765",
    owneraddress: "403 Russell Park, Apt #1, Davis, CA 95616",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Ownership transferred successfully!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">PetChain</Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/profile")} sx={{ ml: 2 }}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/insurance")} sx={{ ml: 2 }}>
              Insurance
            </Button>
            <Button color="inherit" onClick={() => navigate("/pet-health")} sx={{ ml: 2 }}>
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
          flex: 1,
          padding: 3,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Ownership Transfer
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} style={{textDecoration: "underline"}}>
            Pet Information
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography>
              <strong>Pet's Name:</strong> {petData.name}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {petData.gender}
            </Typography>
            <Typography>
              <strong>Age:</strong> {petData.age} years
            </Typography>
            <Typography>
              <strong>Breed:</strong> {petData.breed}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }} style={{textDecoration: "underline"}}>
              Owner's Information
            </Typography>
            <Typography>
              <strong>Owner's Name:</strong> {petData.ownerName}
            </Typography>
            <Typography>
              <strong>Email:</strong> {petData.emailid}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {petData.phoneNumber}
            </Typography>
            <Typography>
              <strong>Address:</strong> {petData.owneraddress}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom style={{textDecoration: "underline"}}>
            New Owner's Information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "id", label: "ID" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "zipcode", label: "Zip Code" },
                { name: "phone", label: "Phone Number" },
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
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "orange" }}>
                  Transfer Ownership
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OwnershipTransfer;
