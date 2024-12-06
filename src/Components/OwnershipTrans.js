import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
  });

  const [ownershipDetails, setOwnershipDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) {
    console.error("User or custom_id is missing!");
    navigate("/", { replace: true });
  }

  const token = localStorage.getItem("token");

  console.log("User:", user);
  console.log("Token:", token);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/pets/getPet/${user.custom_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwnershipDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch ownership details:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [user.custom_id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/initiate-transfer",
        {
          petId: ownershipDetails?.pets[0]?.petId,
          currentOwnerEmail: ownershipDetails?.owner?.email,
          newOwnerEmail: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      alert(response.data.message || "Ownership transferred successfully!");
    } catch (error) {
      console.error("Failed to initiate ownership transfer:", error);
      alert("An error occurred while initiating the transfer.");
    }
  };

  if (error || !ownershipDetails || !ownershipDetails.pets || ownershipDetails.pets.length === 0) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          No pets found for your account.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Add your pet's details to start using this feature.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "orange" }}
          onClick={() => navigate("/pet-registration")}
        >
          Add Pet
        </Button>
      </Container>
    );
  }


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", }}>
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

      {/* Main Content */}
      <Box
        sx={{
          display: "flex", justifyContent: "center",
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

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} style={{ textDecoration: "underline" }}>
            Pet Information
          </Typography>
          <Typography>
            <strong>Pet's Name:</strong> {ownershipDetails.pets[0].name}
          </Typography>
          <Typography>
            <strong>Pet ID:</strong> {ownershipDetails.pets[0].petId}
          </Typography>
          <Typography>
            <strong>Gender:</strong> {ownershipDetails.pets[0].gender}
          </Typography>
          <Typography>
            <strong>Age:</strong> {ownershipDetails.pets[0].age} years
          </Typography>
          <Typography>
            <strong>Breed:</strong> {ownershipDetails.pets[0].breed}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} style={{ textDecoration: "underline" }}>
            Owner's Information
          </Typography>
          <Box>
            <Typography>
              <strong>Owner's Name:</strong> {ownershipDetails.owner.owner_name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {ownershipDetails.owner.email}
            </Typography>
            <Typography>
              <strong>Address:</strong> {ownershipDetails.owner.address}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom style={{ textDecoration: "underline" }}>
            New Owner's Information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "zipcode", label: "Zip Code" },
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
      </Box >
    </Box >
  );
};

export default OwnershipTransfer;
