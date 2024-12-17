import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'; 
import './vet-profile.css'; 
import CornerImage from "../Assets/Vet-corner.png"; 

const VetProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve vet information from state or localStorage
  const user = location.state?.username || JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null); // State to store API response
  const [error, setError] = useState(null); // State to store error messages

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid Pet ID");
      return;
    }
    setError(null); // Clear any existing errors
    try {
      const response = await fetch(`http://localhost:3000/api/pet-health/${searchQuery}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResult(data); // Update the search result
    } catch (err) {
      setError(err.message);
      setSearchResult(null); // Clear any previous results
    }
  };
  
  // Logging searchResult when it changes
  useEffect(() => {
    if (searchResult) {
      console.log("Updated searchResult:", searchResult);
    }
  }, [searchResult]);
  
  return (
    <div>
      {/* Header */}
      <img src={CornerImage} alt="Corner Decoration" className="corner-image-vet" />
      <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">PetChain - Vet Portal</Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate("/vet-profile", { state: { username: user.username } })}
              sx={{ ml: 2 }}
            >
              My Profile
            </Button>
            {/* <Button
              color="inherit"
              onClick={() => navigate("/vet-pet-health")}
              sx={{ ml: 2 }}
            >
              Pet Health
            </Button> */}
            {/* <Button
              color="inherit"
              onClick={() => navigate("/vet-insights")}
              sx={{ ml: 2 }}
            >
              Insights
            </Button> */}
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
      <div className="vet-profile-section-container">
        <div className="vet-profile-section-text-container">
          <Typography variant="h5" className="greeting-message">
            
          </Typography>

          <h1 className="vet-profile-primary-heading">Effortlessly manage veterinary services with ease.</h1>
          <p className="vet-primary-text">
          Review detailed pet health records, track vaccination schedules, and provide informed care recommendations to ensure the well-being of your patients.
 
          </p>

          {/* Search Bar */}
          <div className="search-bar-container" style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <TextField
          label="Enter Pet ID"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pet ID"
          sx={{ flexGrow: 1, maxWidth: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            maxWidth: "300px",
            marginLeft: "10px",
            backgroundColor: "orange",
            color: "white",
            '&:hover': {
              backgroundColor: "darkorange",
            },
          }}
        >
          Search
        </Button>
        <Button
    variant="contained"
    color="secondary"
    onClick={() => {
      setSearchQuery(""); // Clear the input field
      setSearchResult(null); // Clear the search results
      setError(null); // Clear any error messages
    }}
    sx={{
      maxWidth: "300px",
      marginLeft: "10px",
      backgroundColor: "orange",
      color: "white",
      '&:hover': {
        backgroundColor: "darkorange",
      },
    }}
  >
    Reset
  </Button>
          </div>

          {/* Display Search Results */}
          {searchResult ? (
      <Box     sx={{
        marginTop: "20px",
        textAlign: "left",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "400px", // Limit the height of the scrollable area
        overflowY: "auto", // Enable vertical scrolling
        backgroundColor: "#f5f5f5", // Optional styling for better visuals
        padding: "20px",
        borderRadius: "5px",
      }}>
        <Typography variant="h6">Pet Details</Typography>
        <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "5px" }}>
          <Typography><strong>Name:</strong> {searchResult.name}</Typography>
          <Typography><strong>Pet ID:</strong> {searchResult.petId}</Typography>
          <Typography><strong>Allergies:</strong> {searchResult.allergies.join(", ")}</Typography>
          <Typography><strong>Past Treatments:</strong> {searchResult.pastTreatments.join(", ")}</Typography>
          <Typography><strong>Minor Illness Records:</strong> {searchResult.minorIllnessRecords.join(", ")}</Typography>
          <Typography><strong>File:</strong> <a href={searchResult.file} target="_blank" rel="noopener noreferrer">{searchResult.file}</a></Typography>

          {/* Vaccination Records */}
          <Typography variant="h6" sx={{ marginTop: "20px" }}>Vaccination Records</Typography>
          {searchResult.vaccinationRecords.map((record, index) => (
            <Box key={record._id} sx={{ padding: "10px", margin: "10px 0", backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: "5px" }}>
              <Typography><strong>Record {index + 1}:</strong></Typography>
              <Typography><strong>Vaccination Date:</strong> {new Date(record.vaccinationDate).toLocaleDateString()}</Typography>
              <Typography><strong>Vaccine Type:</strong> {record.vaccineType}</Typography>
              <Typography><strong>Next Due Date:</strong> {new Date(record.nextDueDate).toLocaleDateString()}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ) : (
      error && <Typography color="error">{error}</Typography>
    )}
        </div>
      </div>
    </div>
  );
};

export default VetProfile;
