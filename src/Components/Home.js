import React from 'react'
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";

import { FiArrowRight } from "react-icons/fi";
const Home = () => {
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
            <input type="text" className="search-input" placeholder="   Enter Pet ID.." />
            <button className="secondary-button" style={{marginTop: '15px', width:'220px', height:'35px', fontSize:' 20px'}}>Found a Pet</button>
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
