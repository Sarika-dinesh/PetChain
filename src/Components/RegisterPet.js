import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Container, TextField, Typography, Box, Input, Grid, FormControl, FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 


const RegisterPet = () => {
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(null);

  const [formData, setFormData] = useState({
    petName: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    picture: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));


    if (user) {

      setPetData({
        ownerName: user.name,
        customID: user.id,
      });
    } else {
      console.error("User not logged in or missing from localStorage.");
    }
  }, []);


  const [petData, setPetData] = useState({
    ownerName: "",
    customID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must log in first!");
      navigate("/login"); // Redirect to login page
      return;
    }

    // Prepare data for the API
    const payload = {
      name: formData.petName,
      breed: formData.breed,
      age: formData.age,
      gender: formData.gender,
      color: formData.color,
      picture: formData.picture,
    };

    try {
      // Send POST request to the backend API
      console.log("POST request sent");
      const response = await axios.post("http://localhost:3000/api/register/pets", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },

      });


      localStorage.setItem("pet", JSON.stringify(response.data.pet));
      const petData = JSON.parse(localStorage.getItem("pet"))

      alert("New Pet Added Successfully!");
      navigate("/pprofile"); // Redirect to profile page
    } catch (error) {
      console.error("Error registering pet:", error);
      alert(error.response?.data?.message || "Failed to register the pet.");
    }
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
            <Button color="inherit" onClick={() => navigate("/pprofile")} sx={{ ml: 2 }}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/insurance")} sx={{ ml: 2 }}>
              Insurance
            </Button>
            <Button color="inherit" onClick={() => navigate("/pet-health")} sx={{ ml: 2 }}>
              Pet Health
            </Button>
            <Button color="inherit" onClick={() => navigate("/ownership-transfer")} sx={{ ml: 2 }}>
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

              <FormControl fullWidth>
                <FormLabel
                  sx={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    marginLeft: "20px",
                    marginTop: "15px"
                  }}
                >
                  Upload Pet Photo
                </FormLabel>
                <Input
                  fullWidth
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ accept: ".jpeg, .png, .jpg" }}
                  id="PetImage"
                  required
                  sx={{
                    display: "flex",
                    height: "70%",
                    marginTop: "15px",
                    marginLeft: "20px",
                    marginBottom: "20px"
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>

            </Grid>

            <Grid container spacing={2}>
              {[
                { name: "ownerName", label: "Owner's Name", value: petData.ownerName },
                { name: "ownerID", label: "Owner's ID", value: petData.customID },
              ].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    label={field.label}
                    value={field.value}
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