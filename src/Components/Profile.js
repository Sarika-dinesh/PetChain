import React, { useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import './add-pet.css'; 
import CornerImage from "../Assets/cornor-image.png"; 
import LeftCorner from "../Assets/PetOwner.png"; 
const AddPetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve user information from state or localStorage
  const user = location.state?.username || JSON.parse(localStorage.getItem("user"));

  return user ? (
    <div>
      {/* Header */}
      <img src={CornerImage} alt="Corner Decoration" className="corner-image" />
      <img src={LeftCorner} alt="Left Bottom Decoration" className="corner-image-left" />
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
      <div className="add-pet-section-container">
        <div className="add-pet-section-text-container">
          <Typography variant="h5" className="greeting-message">
            {/* Hi {user.username}, Welcome to PetChain! Thank you for choosing us. */}
          </Typography>

          <h1 className="add-pet-primary-heading">Register your Pet to enjoy our services!</h1>
          <p className="pet-primary-text">
          Create a secure and personalized profile for your pet. Add their details now and take the first step toward a safer, smarter, and more connected journey with PetChain.
          </p>


          {/* Navigation Buttons */}
          <div className="add-pet-buttons-container">
            <button 
              className="pprimary-button"               
              onClick={() => navigate('/pet-registration')}
            >
              Add Pet
            </button>
            <button
              className="pprimary-button"
              onClick={() => navigate('/profile')}
            >
              Manage Pets
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null; 
};

export default AddPetPage;
