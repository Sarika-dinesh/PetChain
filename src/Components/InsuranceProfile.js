import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import './insurance-profile.css'; // CSS file for styling the Insurance Profile

const InsuranceProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve insurance user information from state or localStorage
  // Uncomment and modify the below logic if user data is required
  // const user = location.state?.username || JSON.parse(localStorage.getItem("insuranceUser"));
  // if (!user || !user.username) {
  //   navigate("/", { replace: true });
  //   return null; // Prevent rendering if data is missing
  // }

  return (
    <div>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">PetChain - Insurance Portal</Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate("/insurance-profile")}
              sx={{ ml: 2 }}
            >
              My Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/insurance-plans")}
              sx={{ ml: 2 }}
            >
              Insurance Plan
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("insuranceUser");
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
      <div className="insurance-profile-section-container">
        <div className="insurance-profile-section-text-container">
          <Typography variant="h5" className="greeting-message">
            {/* Uncomment this line if the username is available */}
            {/* Hi {user.username}, welcome to your Insurance Dashboard! */}
            Hi User, welcome to PetChain Insurance Dashboard!
          </Typography>

          <h1 className="insurance-profile-primary-heading">Manage Your Insurance Services</h1>
          <p className="insurance-primary-text">
            Explore available insurance plans, manage claims, and ensure your pets are covered.
          </p>

          {/* Buttons Section */}
          {/* <div className="insurance-profile-buttons-container">
            <button
              className="insurance-primary-button"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </button>
            <button
              className="insurance-primary-button"
              onClick={() => navigate("/insurance-plans")}
            >
              View Insurance Plan
            </button>
            <button
              className="insurance-primary-button"
              onClick={() => {
                localStorage.removeItem("insuranceUser");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InsuranceProfile;
