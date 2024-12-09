import React, { useState, useEffect } from "react";
import { AppBar, Box, Button, Container, Grid, TextField, Typography, Toolbar, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import avatar from '../Assets/PetProfile.jpg'

const PetProfile = () => {
  const navigate = useNavigate();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [displayText, setDisplayText] = useState(""); // State for display text
  const [additional_info, setAdditionalInfo] = useState(""); // State for additional info
  const [is_lost, setIsLost] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to handle submission
  const [filePreview, setFilePreview] = useState(null); 

  const [petData, setPetData] = useState({
    petName: "",
    ID: "",
    gender: "",
    breed: "",
    age: "",
    color: "",
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
     // const savedPicture = localStorage.getItem("picture");
      
     let pet = null;
      if (storedPet) {
        try {
          pet = JSON.parse(storedPet);
        } catch (error) {
          localStorage.removeItem("pet");
          console.error("Error parsing pet data from localStorage:", error);
        }
      }

      try {
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
            picture: pet.picture,
          });
          //setIsLost(pet.is_lost || false);
          if (pet.picture) {
            setFilePreview(`data:image/jpeg;base64,${pet.picture}`);
          }

          const lostState = localStorage.getItem("is_lost");
          setIsLost(lostState === "true");
          setDisplayText(
            lostState === "true"
              ? "Your pet has been marked as lost."
              : ""
          );

        }

        // if (savedPicture) {
        //   setFilePreview(savedPicture); // Show saved image preview
        // }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (lostStatus, additionalInfo) => {
    try {
      const petId = petData.ID;

      const response = await axios.post(`http://localhost:3000/api/pets/status/${petId}`, {
        is_lost: lostStatus,
        additional_info: additionalInfo,
      });


      if (response.status === 200) {
        console.log(is_lost);
        console.log(additional_info);
        setIsLost(lostStatus);
        setAdditionalInfo(additional_info);
        localStorage.setItem("is_lost", lostStatus);
        setDisplayText(
          lostStatus
            ? "Your pet has been marked as lost."
            : "Your pet has been marked as found!"
        );
        // setIsSubmitted(lostStatus); // Mark submission as successful only for lost
        setShowAdditionalInfo(false); // Always hide additional info input after submission
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error updating pet status:", error);
      setDisplayText("An error occurred while updating the pet's status. Please try again.");
    }
  };

  const handleLost = () => {
    setShowAdditionalInfo(true); // Show additional info input when marking as lost
    setDisplayText(""); // Clear any previous messages
  };

  const handleSubmit = async () => {
    if (additional_info.trim() === "") {
      setDisplayText("Please provide some additional information before submitting");
      return;
    }
    await handleStatusChange(true, additional_info); // Call with lost status and additional info
  };

  const handleFound = async () => {
    try {
      await handleStatusChange(false, ""); // Call with found status and no additional info
      setIsLost(false); // Reset the lost state
      localStorage.removeItem("is_lost"); // Remove lost state from localStorage
      setShowAdditionalInfo(false); // Hide additional info input
      setAdditionalInfo(""); // Clear additional info input
      setDisplayText(""); // Clear any display message
      navigate("/profile"); // Redirect to profile after marking as found
    } catch (error) {
      console.error("Error marking as found:", error);
      setDisplayText("An error occurred while updating the pet's status. Please try again.");
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
        fontFamily: 'Arial, sans-serif',
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

      {/* Greeting Section */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">
          Hi {ownerData.ownerName}, welcome to PetChain! <br />
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
              src={filePreview || avatar}
              alt="Pet"
              style={{
                marginTop: 20,
                marginLeft: 20,
                width: '90%',
                borderRadius: '16px',
                height: 'auto',
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

        {showAdditionalInfo && !isSubmitted && (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Additional Information"
              multiline
              rows={4}
              value={additional_info}
              onChange={(e) => setAdditionalInfo(e.target.value)} // Controlled input
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'orange',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#D04E00',
                },
                mt: 2,
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        )}

        {!isSubmitted && displayText && (
          <Typography variant="h6" align="center" color="error" sx={{ mt: 2 }}>
            {displayText}
          </Typography>
        )}

        {/* {isSubmitted && (
          <Typography variant="h6" align="center" sx={{ mt: 3, color: 'red' }}>
            Your pet has been marked as lost.
          </Typography>
        )} 

        {displayText && (
          <Typography variant="h6" align="center" sx={{ mt: 3, color: is_lost ? 'red' : 'green' }}>
            {displayText}
          </Typography>
        )} */}

      </Container>

      {/* Floating Button to Add a Pet */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => navigate('/pet-registration')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default PetProfile;