import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddPetIcon from "../Assets/image.png"; // Icon for adding a pet
import './add-pet.css'; // Create and link a new CSS file for this page
const AddPetPage = () => {
  const navigate = useNavigate();

  return (
    <div>
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
              onClick={() => navigate("/owner-transfer")}
              sx={{ ml: 2 }}
            >
              Ownership Transfer
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div className="add-pet-section-container">
        <div className="add-pet-section-text-container">
          <Typography variant="h5" className="greeting-message">
            Hi User, welcome to PetChain! Thank you for choosing us.
          </Typography>

          <h1 className="add-pet-primary-heading">Add Your Beloved Pet</h1>
          <p className="primary-text">
            Let's create a safe and secure profile for your pet! Add their
            details today to get started on your journey with PetChain.
          </p>

          {/* Add Pet Icon Section */}
          <div className="add-pet-icon-container">
            <img 
              src={AddPetIcon} 
              alt="Add Pet Icon" 
              className="add-pet-icon" 
              onClick={() => navigate('/pet-registration')}
            />
            <p className="add-pet-text">Click to Add Pet</p>
          </div>

          {/* Navigation Buttons */}
          <div className="add-pet-buttons-container">
            <button 
              className="primary-button" 
              onClick={() => navigate('/pet-registration')}
            >
              Add Pet
            </button>
            <button
              className="primary-button"
              onClick={() => navigate('/profile')}
            >
              Manage Pets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
