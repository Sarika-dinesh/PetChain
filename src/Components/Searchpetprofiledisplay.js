// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaw } from '@fortawesome/free-solid-svg-icons';

// const SearchPetProfileDisplay = () => {
//     // Hardcoded values
//     const petName = 'Coco';
//     const breed = 'Golden Retriever';
//     const additionalInstructions = 'Very friendly, loves playing fetch.';
//     const petImage = '/images/istockphoto-1164917271-1024x1024.jpg'; // Replace with actual pet image URL

//     // State to control input visibility, input value, and error
//     const [isInputVisible, setInputVisible] = useState(false);
//     const [address, setAddress] = useState('');
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');

//     // Handle button click
//     const handleFoundClick = () => {
//         console.log('Pet Profile:', { petName, breed, additionalInstructions });
//         setInputVisible(true); // Show the input box
//     };

//     const handleSendClick = () => {
//         if (address.trim() === '') {
//             setError("Please enter pet's location");
//         } else {
//             setError('');
//             setMessage("Congratulations! You shared the pet's location with its owner.");
//         }
//     };

//     const handleAddressChange = (e) => {
//         setAddress(e.target.value);
//         if (error) {
//             setError(''); // Clear error when the user starts typing
//         }
//     };

//     return (
//         <div
//             style={{
//                 backgroundColor: '#EFBA55', // Yellow background
//                 backgroundImage: `url('/images/vecteezy_set-of-pets-animals_11143527-removebg-preview.png')`, // Replace with your background image path
//                 backgroundSize: 'contain',
//                 backgroundPosition: 'top center',
//                 backgroundRepeat: 'no-repeat',
//                 minHeight: '100vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 fontFamily: 'Arial, sans-serif',
//                 padding: '20px', // Add some padding for better spacing
//             }}
//         >
//             <div
//                 style={{
//                     backgroundColor: 'white',
//                     padding: '20px',
//                     borderRadius: '10px',
//                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                     maxWidth: '600px',
//                     width: '100%',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'flex-start',
//                     gap: '20px',
//                 }}
//             >
//                 {/* Left Side: Pet Info */}
//                 <div style={{ flex: 2 }}>
//                     <h2
//                         style={{
//                             textAlign: 'center',
//                             color: '#333',
//                             fontFamily: 'cursive',
//                             fontStyle: 'italic',
//                             fontWeight: '800',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             gap: '10px',
//                         }}
//                     >
//                         Pet Profile
//                         <FontAwesomeIcon icon={faPaw} size="xl" />
//                     </h2>
//                     <div style={{ marginBottom: '15px' }}>
//                         <label
//                             style={{
//                                 fontSize: '16px',
//                                 fontWeight: 'bold',
//                                 display: 'block',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             Pet's Name:
//                         </label>
//                         <p
//                             style={{
//                                 fontSize: '16px',
//                                 margin: '5px 0',
//                                 color: '#333',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             {petName}
//                         </p>
//                     </div>

//                     <div style={{ marginBottom: '15px' }}>
//                         <label
//                             style={{
//                                 fontSize: '16px',
//                                 fontWeight: 'bold',
//                                 display: 'block',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             Breed:
//                         </label>
//                         <p
//                             style={{
//                                 fontSize: '16px',
//                                 margin: '5px 0',
//                                 color: '#333',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             {breed}
//                         </p>
//                     </div>

//                     <div style={{ marginBottom: '15px' }}>
//                         <label
//                             style={{
//                                 fontSize: '16px',
//                                 fontWeight: 'bold',
//                                 display: 'block',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             Additional Instructions:
//                         </label>
//                         <p
//                             style={{
//                                 fontSize: '16px',
//                                 margin: '5px 0',
//                                 color: '#333',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             {additionalInstructions}
//                         </p>
//                     </div>

//                     <button
//                         type="button"
//                         onClick={handleFoundClick}
//                         style={{
//                             display: 'block',
//                             width: '100%',
//                             padding: '10px',
//                             fontSize: '16px',
//                             backgroundColor: '#28a745',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                             textAlign: 'center',
//                             marginTop: '20px',
//                             fontFamily: 'cursive',
//                         }}
//                     >
//                         FOUND
//                     </button>

//                     {isInputVisible && (
//                         <div style={{ marginTop: '30px', textAlign: 'left' }}>
//                             <label
//                                 htmlFor="myinput"
//                                 style={{
//                                     display: 'block',
//                                     fontSize: '16px',
//                                     fontWeight: 'bold',
//                                     marginBottom: '5px',
//                                     fontFamily: 'cursive',
//                                 }}
//                             >
//                                 Address:
//                             </label>
//                             <textarea
//                                 id="myinput"
//                                 placeholder="Enter the address.."
//                                 value={address}
//                                 onChange={handleAddressChange}
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     fontSize: '14px',
//                                     border: '1px solid #ccc',
//                                     borderRadius: '5px',
//                                     resize: 'vertical',
//                                     minHeight: '80px',
//                                     maxHeight: '200px',
//                                     fontFamily: 'cursive',
//                                 }}
//                             ></textarea>
//                             {error && (
//                                 <p
//                                     style={{
//                                         color: 'red',
//                                         marginTop: '5px',
//                                         fontSize: '14px',
//                                     }}
//                                 >
//                                     {error}
//                                 </p>
//                             )}
//                         </div>
//                     )}
//                     {isInputVisible && (
//                         <button
//                             type="button"
//                             onClick={handleSendClick}
//                             style={{
//                                 display: 'block',
//                                 width: '50%',
//                                 padding: '10px',
//                                 fontSize: '16px',
//                                 backgroundColor: '#28a745',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: 'pointer',
//                                 textAlign: 'center',
//                                 marginTop: '10px',
//                                 marginLeft: 'auto',
//                                 fontFamily: 'cursive',
//                             }}
//                         >
//                             FOUND YOUR PET
//                         </button>
//                     )}
//                     {message && <p style={{ color: 'blue', fontFamily: 'cursive' }}>{message}</p>}
//                 </div>

//                 {/* Right Side: Pet Image */}
//                 <div
//                     style={{
//                         flex: 1,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         flexDirection: 'column',
//                     }}
//                 >
//                     <img
//                         src={petImage}
//                         alt="Pet"
//                         style={{
//                             width: '100%',
//                             maxWidth: '200px',
//                             height: 'auto',
//                             borderRadius: '15px',
//                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                             marginBottom: '10px',
//                             marginTop: '60px',
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchPetProfileDisplay;



import React, { useState, useEffect } from "react";
import { AppBar, Box, Button, Container, Grid, TextField, Typography, Toolbar, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

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
        breed: "",
        picture: "",
        additional_info: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const storedPet = localStorage.getItem("pet");

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
                if (pet) {
                    setPetData({
                        petName: pet.name,
                        breed: pet.breed,
                        additional_info: pet.additional_info,
                        picture: pet.picture,
                    });
                }

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
                    <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>(
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
                        );
};

                        export default Searchpetprofiledisplay;
