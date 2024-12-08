import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OwnershipTransfer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [ownershipDetails, setOwnershipDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [transfers, setTransfers] = useState([]);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user || !user.id) {
  //     console.error("User not found or missing custom ID.");
  //     navigate("/", { replace: true });
  //   } else {
  //     setOwnershipDetails((prevState) => ({
  //       ...prevState,
  //       owner: {
  //         owner_name: user.name,
  //         ownerId: user.id,
  //         email: user.email,
  //       },
  //     }));
  //   }
  // }, [navigate]);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/"); 
          return;
        }
  
        const response = await axios.get(`http://localhost:3000/api/pets/getPet/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.data.pets && response.data.pets.length > 0) {
          setOwnershipDetails({
            pets: response.data.pets,
            owner: response.data.owner,
          });
        } else {
          setError(true); 
        }
      } catch (error) {
        console.error("Error fetching ownership and pet details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPetData();
  }, [navigate]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.email) {
          console.error("User not found or missing email.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/transfer/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTransfers(response.data);
      } catch (error) {
        console.error("Failed to fetch transfer requests:", error);
      }
    };

    fetchTransfers();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/transfer/initiate-transfer",
        {
          petId: ownershipDetails?.pets[0]?.petId,
          currentOwnerEmail: ownershipDetails?.pets[0].owner_email,
          newOwnerEmail: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTransfers((prev) => [
        ...prev,
        {
          transferId: response.data.transferId,
          petName: ownershipDetails?.pets[0]?.name,
          status: "Pending approval from New Owner",
        },
      ]);
      setOpenDialog(true);
    } catch (error) {
      console.error("Failed to initiate ownership transfer:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 3,
        }}
      ><Container
        maxWidth="md"
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
          <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>
            {loading ? (
              <CircularProgress />
            ) : error || !ownershipDetails || !ownershipDetails.pets || ownershipDetails.pets.length === 0 ? (
              <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  No pets found for your account.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Add your pet's details to start using this feature.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "orange" }}
                  onClick={() => navigate("/pet-registration")}
                >
                  Add Pet
                </Button>
              </Container>
            ) : (
              <Box>
                <Typography variant="h4" align="center" gutterBottom>
                  Ownership Transfer
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    padding: "0 0",
                    borderBottom: "1px solid black",
                    marginTop: 3,
                  }}
                >
                  Pet Information
                </Typography>
                <Typography>
                  <strong>Pet's Name:</strong> {ownershipDetails.pets[0].name}
                </Typography>
                <Typography>
                  <strong>Pet ID:</strong> {ownershipDetails.pets[0].petId}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {ownershipDetails.pets[0].gender}
                </Typography>
                <Typography>
                  <strong>Age:</strong> {ownershipDetails.pets[0].age} years
                </Typography>
                <Typography>
                  <strong>Breed:</strong> {ownershipDetails.pets[0].breed}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    padding: "0 0",
                    borderBottom: "1px solid black",
                    marginTop: 3,
                  }}
                >
                  Owner's Information
                </Typography>
                <Box>
                  <Typography>
                    <strong>Owner's Name:</strong> {ownershipDetails.owner.owner_name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {ownershipDetails.pets[0].owner_email}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    padding: "0 0",
                    borderBottom: "1px solid black",
                    marginTop: 3,
                  }}
                >
                  New Owner's Information
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    {[
                      { name: "name", label: "Name" },
                      { name: "email", label: "Email" },
                      { name: "address", label: "Address" },
                      { name: "zipcode", label: "Zip Code" },
                    ].map((field, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <TextField
                          fullWidth
                          name={field.name}
                          label={field.label}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "orange" }}>
                        Transfer Ownership
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

              </Box>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                padding: "0 0",
                borderBottom: "1px solid black",
                marginTop: 3,
              }}
            >
              Transfers
            </Typography>
            {transfers.length > 0 ? (
              <Box>
                {transfers.map((transfer, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <strong>Transfer ID:</strong> {transfer._id}
                    </Typography>
                    <Typography>
                      <strong>Pet Id:</strong> {transfer.petId}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong> {transfer.status || "Pending"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography>No transfer requests found.</Typography>


            )}
          </Box>
        </Container>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Transfer Initiated</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The ownership transfer request has been successfully initiated. An email has been sent to the new owner.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default OwnershipTransfer;
