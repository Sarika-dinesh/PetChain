import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const SearchPetProfileDisplay = () => {
    // Hardcoded values
    const petName = 'Coco';
    const breed = 'Golden Retriever';
    const additionalInstructions = 'Very friendly, loves playing fetch.';
    const petImage = '/images/istockphoto-1164917271-1024x1024.jpg'; // Replace with actual pet image URL

    // State to control input visibility, input value, and error
    const [isInputVisible, setInputVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Handle button click
    const handleFoundClick = () => {
        console.log('Pet Profile:', { petName, breed, additionalInstructions });
        setInputVisible(true); // Show the input box
    };

    const handleSendClick = () => {
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
        <div
            style={{
                backgroundColor: '#EFBA55', // Yellow background
                backgroundImage: `url('/images/vecteezy_set-of-pets-animals_11143527-removebg-preview.png')`, // Replace with your background image path
                backgroundSize: 'contain',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Arial, sans-serif',
                padding: '20px', // Add some padding for better spacing
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: '20px',
                }}
            >
                {/* Left Side: Pet Info */}
                <div style={{ flex: 2 }}>
                    <h2
                        style={{
                            textAlign: 'center',
                            color: '#333',
                            fontFamily: 'cursive',
                            fontStyle: 'italic',
                            fontWeight: '800',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        Pet Profile
                        <FontAwesomeIcon icon={faPaw} size="xl" />
                    </h2>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                display: 'block',
                                fontFamily: 'cursive',
                            }}
                        >
                            Pet's Name:
                        </label>
                        <p
                            style={{
                                fontSize: '16px',
                                margin: '5px 0',
                                color: '#333',
                                fontFamily: 'cursive',
                            }}
                        >
                            {petName}
                        </p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                display: 'block',
                                fontFamily: 'cursive',
                            }}
                        >
                            Breed:
                        </label>
                        <p
                            style={{
                                fontSize: '16px',
                                margin: '5px 0',
                                color: '#333',
                                fontFamily: 'cursive',
                            }}
                        >
                            {breed}
                        </p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                display: 'block',
                                fontFamily: 'cursive',
                            }}
                        >
                            Additional Instructions:
                        </label>
                        <p
                            style={{
                                fontSize: '16px',
                                margin: '5px 0',
                                color: '#333',
                                fontFamily: 'cursive',
                            }}
                        >
                            {additionalInstructions}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleFoundClick}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            marginTop: '20px',
                            fontFamily: 'cursive',
                        }}
                    >
                        FOUND
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
                        <button
                            type="button"
                            onClick={handleSendClick}
                            style={{
                                display: 'block',
                                width: '50%',
                                padding: '10px',
                                fontSize: '16px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                marginTop: '10px',
                                marginLeft: 'auto',
                                fontFamily: 'cursive',
                            }}
                        >
                            FOUND YOUR PET
                        </button>
                    )}
                    {message && <p style={{ color: 'blue', fontFamily: 'cursive' }}>{message}</p>}
                </div>

                {/* Right Side: Pet Image */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <img
                        src={petImage}
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
            </div>
        </div>
    );
};

export default SearchPetProfileDisplay;
