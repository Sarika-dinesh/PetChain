import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Container, TextField, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    ID: "",
  });

  const [ownerData, setOwnerData] = useState({
    ownerID: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      petId: petData.ID,
      ownerId: ownerData.ownerID,
      providerName: formData.providerName,
      policyNumber: formData.policyNumber,
      coverageAmount: formData.coverageAmount,
      validityPeriod: {
        startDate: formData.validityPeriod.startDate,
        endDate: formData.validityPeriod.endDate,
      },
    };

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post(
        "http://172.23.10.233:3000/api/insurance/claim/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("insurance", JSON.stringify(response.data));
      if (response.data.claimId) {
        localStorage.setItem("claimId", response.data.claimId);
      }
      console.log("ADD INSURANCE DATA",response.data)
      alert("Pet Insurance Policy Added Successfully!");
      navigate("/insurance");
    } catch (error) {
      console.error("Error adding insurance policy:", error);
      alert(error.response?.data?.message || "Failed to add pet's insurance policy.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
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
                      bgcolor: "#e55a00",
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
