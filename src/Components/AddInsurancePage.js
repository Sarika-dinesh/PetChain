import React from "react";
import AddInsuranceBackground from "../Assets/about-background.png";
import AddInsuranceImage from "../Assets/insurance-pet.jpg";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './add-insurance.css';
const AddInsurancePage = () => {
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
      <div className="add-insurance-section-container">
        <div className="add-insurance-background-image-container">
          <img src={AddInsuranceBackground} alt="" />
        </div>
        <div className="add-insurance-section-image-container">
          <img src={AddInsuranceImage} alt="" />
        </div>
        <div className="add-insurance-section-text-container">
          <p className="primary-subheading"></p>
          <h1 className="add-insurance-primary-heading">Secure Your Pet's Future</h1>
          <p className="primary-text">
            Protect your pets with comprehensive pet insurance plans.
            From routine checkups to unforeseen emergencies, we've got you
            covered.
          </p>
          <p className="primary-text">
            
          </p>
          <div className="add-insurance-buttons-container">
  <button className="primary-button" onClick={() => navigate('/add-insurance')}>
    Add Insurance
  </button>
  <button
    className="primary-button"
    onClick={() => navigate('/claim-insurance')}
  >
    Claim Insurance
  </button>

</div>
        </div>
      </div>
    </div>
  );
};

export default AddInsurancePage;
