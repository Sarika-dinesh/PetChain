import React, { useState, useEffect } from "react";
import { AppBar, Box, Button, Container, Grid, TextField, Typography, Toolbar, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const PetProfile = () => {
  const navigate = useNavigate();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [displayText, setDisplayText] = useState(""); // State for text

  // Example pet profile data
  // const petData = {
  //   name: 'Coco',
  //   ID: 'PET_1733272469830',
  //   gender: 'Female',
  //   ownerName: 'Sakshi Singh',
  //   ownerID: '456',
  //   age: 2,
  //   breed: 'Cocker Spaniel',
  //   color: 'Golden',
  //   additionalInfo: 'Loves playing fetch and enjoys long walks in the park.',
  //   picture: '/images/istockphoto-1164917271-1024x1024.jpg', // Correct path
  // };


  const [petData, setPetData] = useState({
    petName: "",
    ID: "",
    gender: "",
    breed: "",
    age: "",
    color: "",
    additionalInfo: "",
    picture: "",
  });

  const [ownerData, setOwnerData] = useState({
    ownerName: "",
    ownerID: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const storedPet = localStorage.getItem("pet");
      let pet = null;
      if (storedPet) {
        try {
          pet = JSON.parse(storedPet);
        } catch (error) {
          localStorage.removeItem("pet");
          console.error("Error parsing pet data from localStorage:", error);
        }
      }
      console.log("New data");
      console.log(pet);

      try {
        // If user and pet data are available in localStorage, use them
        if (user) {
          setOwnerData({
            ownerName: user.name,
            ownerID: user.id,
          });
        }

        if (pet) {
          setPetData({
            petName: pet.name,
            ID: pet.petId,
            breed: pet.breed,
            age: pet.age,
            color: pet.color,
            gender: pet.gender,
            additonalInfo: pet.additionalInfo,
            picture: pet.picture
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleLost = () => {
  //   setShowAdditionalInfo(true);
  //   console.log('Pet marked as LOST');
  // };

  // const handleFound = () => {
  //   setShowAdditionalInfo(false);
  //   console.log('Pet marked as FOUND');
  // };

  // const handleSubmit = () => {
  //   setShowAdditionalInfo(false);
  //   setDisplayText("Your pet has been marked as lost.");
  // };

  const handleLost = async () => {
    try {
      const petId = petData.ID;
      const response = await axios.post('http://localhost:3000/api/pets/status/${petId}', {
        isLost: true,
        additionalInfo: petData.additionalInfo,
      });
      console.log(response.data.message);
      setShowAdditionalInfo(true);
    } catch (error) {
      console.error('Error updating pet status:', error);
    }
  };

  const handleFound = async () => {
    try {
      const petId = petData.ID;
      const response = await axios.post('http://localhost:3000/api/pets/status/${petId}', {
        isLost: false,
        additionalInfo: '',
      });
      console.log(response.data.message);
      setShowAdditionalInfo(false);
    } catch (error) {
      console.error('Error updating pet status:', error);
    }
  };

  const handleSubmit = async () => {
    const additionalInfo = document.querySelector('[label="Additional Information"]').value;
    const petId = petData.ID

    try {
      const response = await axios.post('http://localhost:3000/api/pets/status/${petId}', {
        // petId: petData.ID,
        isLost: true,
        additionalInfo: additionalInfo,
      });
      console.log(response.data.message);
      setDisplayText("Your pet has been marked as lost.");
      setShowAdditionalInfo(false);
    } catch (error) {
      console.error('Error submitting additional info:', error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        backgroundImage: `url('/images/vecteezy_set-of-pets-animals_11143527-removebg-preview.png')`,
        backgroundSize: 'contain',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        /*padding: '20px',*/
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <AppBar position="flex" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">PetChain</Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate('/pprofile')} sx={{ mx: 1 }}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate('/insurance')} sx={{ mx: 1 }}>
              Insurance
            </Button>
            <Button color="inherit" onClick={() => navigate('/pet-health')} sx={{ mx: 1 }}>
              Pet Health
            </Button>
            <Button color="inherit" onClick={() => navigate('/owner-transfer')} sx={{ mx: 1 }}>
              Ownership Transfer
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Greeting Section */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">
          Hi Sakshi, welcome to PetChain! <br />
          Thank you for choosing us.
        </Typography>
      </Box>

      {/* Main Pet Profile Section */}
      <Container
        maxWidth="md"
        sx={{
          bgcolor: 'white',
          mt: 5,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Pet Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={petData.picture}
              alt="Pet"
              style={{
                width: '100%',
                borderRadius: '16px',
                height: 'auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
            <TextField
              fullWidth
              label="Pet ID"
              value={petData.ID}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Gender"
              value={petData.gender}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Age"
              value={`${petData.age} years`}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Breed"
              value={petData.breed}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Color"
              value={petData.color}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Owner
            </Typography>
            <TextField
              fullWidth
              label="Owner's Name"
              value={ownerData.ownerName}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Owner ID"
              value={ownerData.ownerID}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'red',
              color: '#fff',
              '&:hover': {
                bgcolor: '#D04E00',
              },
            }}
            onClick={handleLost}
          >
            Mark as LOST
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'green',
              color: '#fff',
              '&:hover': {
                bgcolor: '#388E3C',
              },
              ml: 2,
            }}
            onClick={handleFound}
          >
            Mark as FOUND
          </Button>
        </Box>
        {showAdditionalInfo && (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Additional Information"
              multiline
              rows={4}
              defaultValue={petData.additionalInfo}
              variant="outlined"
              margin="normal"
            />

            <button type="button" variant="contained"
              sx={{
                bgcolor: 'orange',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#D04E00',
                },
                mt: 2,
              }}
              onClick={handleSubmit}>
              Submit
            </button>
          </Box>
        )}
      </Container >

      {/* Floating Button to Add a Pet */}
      < Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => navigate('/add-pet')}
      >
        <AddIcon />
      </Fab >
    </Box >
  );
};

export default PetProfile;
