// import React from 'react'
// import BannerBackground from "../Assets/home-banner-background.png";
// import BannerImage from "../Assets/home-banner-image.png";
// import Navbar from "./Navbar";

// import { FiArrowRight } from "react-icons/fi";
// const Home = () => {

//   return (
//     <div className='home-container'>

//       <Navbar />
//       <div className="home-banner-container">
//         <div className="home-bannerImage-container">
//           <img src={BannerBackground} alt="" />
//         </div>
//         <div className="home-text-section">
//           <h1 className="primary-heading">
//             PetChain
//           </h1>
//           <p className="primary-text">
//             The Future of Petcare—Connected, Secure, Decentralized
//           </p>
//           <div>
//             <input type="text" className="search-input" placeholder="   Enter Pet ID.." />
//             <button className="secondary-button" style={{marginTop: '15px', width:'220px', height:'35px', fontSize:' 20px'}}>Found a Pet</button>
//           </div>
//         </div>
//         <div className="home-image-section">
//           <img src={BannerImage} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";

const Home = () => {
  const [petId, setPetId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle the search
  const handleSearch = async () => {
    try {
      setErrorMessage(''); // Clear any previous errors

      // Fetch data from the backend
      const response = await fetch(`https://localhost:3000/api/pets/status/${petId}`);
      const data = await response.json();

      if (response.ok) {
        if (data.pet.is_Lost) {
          // Redirect to the search page if is_Lost is true
          navigate(`https://localhost:3000/api/pets/search/${petId}`);
        } else {
          setErrorMessage('The pet is not lost.');
        }
      } else {
        setErrorMessage(data.message || 'Error fetching pet details.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again later.');
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
              placeholder="   Enter Pet ID.."
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
            />
            <button
              className="secondary-button"
              style={{ marginTop: '15px', width: '220px', height: '35px', fontSize: '20px' }}
              onClick={handleSearch}
            >
              Found a Pet
            </button>
          </div>
          {errorMessage && <p className="error-text">{errorMessage}</p>}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
