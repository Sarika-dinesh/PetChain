import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import ResDB from "../Assets/ResDB.png";
import UCD from "../Assets/UCDavis.png";

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading" style={{ fontSize: "30px" }} >Have Question In Mind?</h1>
      <h1 className="primary-heading" style={{ fontSize: "30px" }}>Let Us Help You</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="Enter your query here" />
        <button className="secondary-button">Submit</button>
      </div>

      {/* *FOOTER* */}
      <div
        className="footer-section-two"
        style={{
          marginTop: "5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="footer-section-columns" style={{ flex: "1", textAlign: "center" }}>
          <img src={UCD} alt="" style={{ width: "40%" }} />
        </div>
        <div className="footer-section-columns" style={{ flex: "1", textAlign: "center" }}>
          <img src={ResDB} alt="" style={{ width: "40%" }} />
        </div>
        <div className="footer-section-columns" style={{ flex: "1", textAlign: "center" }}>
          <span>244-5333-7783</span>
          <span>petchain@gmail.com</span>
        </div>
        <div className="footer-section-columns" style={{ flex: "1", textAlign: "center" }}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;