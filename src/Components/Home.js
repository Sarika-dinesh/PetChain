import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";

const Home = () => {
  const [petId, setPetId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle the input change
  const handlePetIdChange = (e) => {
    console.log(e);
    setPetId(e.target.value);
  };

  // Check the pet in the database and navigate
  const handleSearchPet = async () => {
    if (petId.trim() === '') {
      setError('Please enter a Pet ID');
      return;
    }

    try {
      console.log("Getting response");
      console.log(petId);
      const response = await axios.get(`http://localhost:3000/api/pets/search/${petId}`);
      const pet = response.data;
      console.log(pet);
      console.log(pet.is_lost);

      if (response.status === 200) {
        // If the pet is lost, navigate to the search page
        navigate('/search-profile');
      } else {
        setError('This pet is not lost.');
      }
    } catch (error) {
      setError('This pet is not lost');
      console.error('Error fetching pet:', error);
    }
  };

  return (
    <div className='home-container'>
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            PetChain
          </h1>
          <p className="primary-text">
            The Future of Petcare—Connected, Secure, Decentralized
          </p>
          <div>
            <input
              type="text"
              className="search-input"
              placeholder="Enter Pet ID..."
              value={petId}
              onChange={handlePetIdChange}
            />
            <button
              className="secondary-button"
              style={{ marginTop: '15px', width: '220px', height: '35px', fontSize: '20px' }}
              onClick={handleSearchPet}
            >
              Found a Pet
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
