import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Container, TextField, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const AddInsurancePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    providerName: "",
    policyNumber: "",
    coverageAmount: "",
    validityPeriod: {
      startDate: "",
      endDate: "",
    },
  });

  const [petData, setPetData] = useState({
    ID: ""
  });

  const [ownerData, setOwnerData] = useState({
    ownerID: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const pet = JSON.parse(localStorage.getItem("pet"));

      try {
        if (user) {
          setOwnerData({
            ownerID: user.id,
          });
        }

        if (pet) {
          setPetData({
            ID: pet.petId,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle validityPeriod nested fields
    if (name === "startDate" || name === "endDate") {
      setFormData({
        ...formData,
        validityPeriod: {
          ...formData.validityPeriod,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   alert("Insurance Added!");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Add Insurance");

    // Prepare data for the API
    const payload = {
      ID: petData.ID,
      ownderID: ownerData.ID,
      provideName: formData.provideName,
      policyNumber: formData.policyNumber,
      coverageAmount: formData.coverageAmount,
      validityPeriod: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
    };

    try {
      // Send POST request to the backend API
      console.log("POST request sent");
      const response = await axios.post("http://localhost:3000/api/insurance/claim/add", payload);

      console.log("Verifying data");
      console.log(response.data);

      // Save insurance information in localStorage
      console.log("removed response ok")
      localStorage.setItem("insurance", JSON.stringify(response.data));
      const insuranceData = JSON.parse(localStorage.getItem("insurance"))
      console.log(insuranceData)

      alert("Pet Insurance Policy Added Successfully!");
      navigate("/insurance"); // Redirect to profile page
    } catch (error) {
      console.error("Error adding insurance policy:", error);
      alert(error.response?.data?.message || "Failed to add pet's insurace policy.");
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
            Add Pet Insurance
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="petId"
                  label="Pet's ID"
                  value={petData.ID}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ownerId"
                  label="Owner's ID"
                  value={ownerData.ownerID}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="providerName"
                  label="Insurance Provider Name"
                  value={formData.providerName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="policyNumber"
                  label="Policy Number"
                  multiline
                  value={formData.policyNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="coverageAmount"
                  label="Coverage Amount"
                  value={formData.coverageAmount}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Typography variant="p" gutterBottom style={{ padding: "70px 0px 50px 50px" }}>
                Validity Period:
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="startDate"
                      label="Start Date"
                      type="date"
                      value={formData.validityPeriod.startDate || ""}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          paddingTop: "8px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="endDate"
                      label="End Date"
                      type="date"
                      value={formData.validityPeriod.endDate || ""}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          paddingTop: "8px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    bgcolor: "orange",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#e55a00", // Slightly darker shade on hover
                    },
                  }}
                >
                  Add Insurance
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AddInsurancePage;
