import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/front-page.png";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading"style={{fontSize: '30px'}}>About</p>
        <h1 className="primary-heading" style={{fontSize: '20px'}}>
        Care and Connection in Every Paw Print
        </h1>
        <p className="primary-text">
        PetChain is a decentralized pet care platform that streamlines pet identification, health record management, and insurance services with blockchain technology. 
        </p>
        <p className="primary-text">
        It empowers pet owners with secure, transparent, and efficient solutions for lost pets, health tracking, and ownership transfers.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          
        </div>
      </div>
    </div>
  );
};

export default About;