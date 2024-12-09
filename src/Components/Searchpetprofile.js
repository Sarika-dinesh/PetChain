import React, { useState, useEffect } from "react";
import { AppBar, Box, Button, Container, Grid, TextField, Typography, Toolbar, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Navbar from "./Navbar";
import avatar from '../Assets/PetProfile.jpg'
import axios from 'axios';

const SearchPetProfile = () => {
    const navigate = useNavigate();
    const [isInputVisible, setInputVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [additional_info, setAdditionalInfo] = useState(""); // State for additional info
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

    // Handle button click
    const handleFoundClick = () => {
        //console.log('Pet Profile:', { petData.petName, petData.breed, petData.additional_info });
        setInputVisible(true); // Show the input box
    };

    const handleNotifyClick = () => {
        if (address.trim() === '') {
            setError("Please enter pet's location");
        } else {
            setError('');
            setMessage("Congratulations! You shared the pet's location with its owner.");
        }
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        if (error) {
            setError(''); // Clear error when the user starts typing
        }
    };


    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">PetChain</Typography>
                    <Box>
                        <div style={{ width: "107%" }}>
                            <Navbar />
                            <div className="home-banner-container" />
                        </div>
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
                        <Box>
                            <Typography variant="h4" align="center" gutterBottom>
                                {petData.petName}'s Details
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1.2rem",
                                    marginBottom: "10px",
                                    // borderBottom: "1px solid black",
                                    textDecoration: "underline",
                                    marginTop: 3,
                                }}
                            >
                                Pet Information
                            </Typography>
                            <Typography style={{ marginBottom: "20px" }}>
                                <strong>Pet's Name:</strong> {petData.petName}
                            </Typography>
                            <Typography style={{ marginBottom: "20px" }}>
                                <strong>Breed:</strong> {petData.breed}
                            </Typography>
                            <Typography style={{ marginBottom: "20px" }}>
                                <strong>Additional Information:</strong> {petData.additional_info}
                            </Typography>

                            {/* Right Side: Pet Image */}
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'right',
                                    alignItems: 'right',
                                    flexDirection: 'row',
                                }}
                            >
                                <img
                                    src={avatar}
                                    alt="Pet"
                                    style={{
                                        width: '100%',
                                        maxWidth: '200px',
                                        height: 'auto',
                                        borderRadius: '15px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        marginBottom: '10px',
                                        marginTop: '60px',
                                    }}
                                />
                            </div>

                            <button className="secondary-button"
                                style={{ width: "30%", fontFamily: 'cursive', borderRadius: '5px', marginTop: '20px' }}
                                onClick={handleFoundClick}
                            >
                                FOUND {petData.petName}
                            </button>

                            {isInputVisible && (
                                <div style={{ marginTop: '30px', textAlign: 'left' }}>
                                    <label
                                        htmlFor="myinput"
                                        style={{
                                            display: 'block',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                            fontFamily: 'cursive',
                                        }}
                                    >
                                        Address:
                                    </label>
                                    <textarea
                                        id="myinput"
                                        placeholder="Enter the address.."
                                        value={address}
                                        onChange={handleAddressChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '14px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            maxHeight: '200px',
                                            fontFamily: 'cursive',
                                        }}
                                    ></textarea>
                                    {error && (
                                        <p
                                            style={{
                                                color: 'red',
                                                marginTop: '5px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {error}
                                        </p>
                                    )}
                                </div>
                            )}
                            {isInputVisible && (
                                <button className="secondary-button"
                                    style={{ marginLeft: 'auto', fontFamily: 'cursive', borderRadius: '5px', marginTop: '20px' }}
                                    onClick={handleNotifyClick}
                                >
                                    NOTIFY OWNER
                                </button>
                            )}
                            {message && <p style={{ color: 'blue', fontFamily: 'cursive' }}>{message}</p>}

                        </Box>

                    </Box>
                </Container>
            </Box >
        </Box >
    )
};

export default SearchPetProfile;
