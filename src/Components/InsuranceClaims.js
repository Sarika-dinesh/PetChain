import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InsuranceClaimPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    insurancePolicy: "",
    treatmentType: "",
    insuranceAmount: "",
    documents: null,
  });

  const [petData, setPetData] = useState({ petID: "" });
  const [ownerData, setOwnerData] = useState({ ownerID: "" });
  const [insuranceData, setInsuranceData] = useState({ policyNumber: "" });
  const [claimId, setclaimId] = useState({ claimId: "" });

  const [responseStatus, setResponseStatus] = useState(null);
  const [reimbursedAmount, setReimbursedAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const storedPet = JSON.parse(localStorage.getItem("pet"));
      const polNumber = JSON.parse(localStorage.getItem("insurance"));
      const claimId = localStorage.getItem("claimId");

      try {
        if (user) {
          setOwnerData({ ownerID: user.id });
        }

        if (storedPet) {
          setPetData({ petID: storedPet.petId });
        }

        if (polNumber) {
          setInsuranceData({ policyNumber: polNumber.policyNumber });
        }
        if (claimId) {
          setclaimId(claimId); // Set directly as a string
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      petId: petData.petID,
      claimId: claimId, // Replace with a unique ID generation logic
      claimedAmount: formData.insuranceAmount,
      treatmentType: formData.treatmentType,
      documents: ["https://example.com/files/vet-bill.pdf"], // Replace with actual document upload logic
    };
    console.log("payload for submit insurance",payload)

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post(
        "http://172.23.10.233:3000/api/insurance/claim/submit",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      if (responseData.success) {
        setResponseStatus(responseData.status);
        setReimbursedAmount(responseData.reimbursedAmount);
      } else {
        setResponseStatus("decline");
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Failed to submit claim. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
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

      <Container
        maxWidth="md"
        sx={{
          bgcolor: "white",
          mt: 5,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Pet Insurance Claim
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Owner's ID"
                value={ownerData.ownerID}
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pet's ID"
                value={petData.petID}
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="insurancePolicy"
                label="Insurance Policy Number"
                value={formData.insurancePolicy}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="treatmentType"
                label="Treatment Type"
                value={formData.treatmentType}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="insuranceAmount"
                label="Claim Amount"
                value={formData.insuranceAmount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  bgcolor: "orange",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#D04E00",
                  },
                }}
              >
                Upload Documents
                <input type="file" hidden name="documents" onChange={handleChange} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "orange",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#D04E00",
                  },
                }}
              >
                Submit Claim
              </Button>
            </Grid>
          </Grid>
        </Box>
        {responseStatus && (
          <Box sx={{ mt: 4, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h6">
              Status: {responseStatus === "accept" ? "Accepted" : "Declined"}
            </Typography>
            {responseStatus === "accept" && (
              <Typography variant="body1">Reimbursed Amount: {reimbursedAmount}</Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InsuranceClaimPage;
