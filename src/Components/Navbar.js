import React, { useState } from 'react';
import Logo from "../Assets/Logo.svg"
import { useNavigate } from 'react-router-dom';

import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />
    },
    {
      text: "About",
      icon: <InfoIcon />
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />
    },
    {
      text: "Services",
      icon: <HomeIcon />
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <a href="/home">Home</a>
        <a href="/about-us">About</a>
        <a href="/services">Services</a>
        <a href="/contact-info">Contact</a>
        {/* Wrapper for Getting Started button and dropdown */}
        <div className="button-dropdown-container">
        <button
        className="primary-button"
        onClick={() => navigate('/login')} // Navigate to /login
      >
        Getting Started
      </button>
        </div>
      </div>  
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <style jsx>{`
        .button-dropdown-container {
          position: relative; /* New container with relative positioning */
          display: inline-block; /* Ensures it stays aligned with the button */
        }

        .dropdown-container {
          position: absolute;
          top: 100%; /* Positions the dropdown directly below the button */
          left: 0; /* Aligns it with the button */
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          padding: 10px;
          z-index: 1000;
        }

        .dropdown-container ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dropdown-container li {
          margin: 5px 0;
        }

        .dropdown-container li a {
          text-decoration: none;
          color: #333;
        }

        .dropdown-container li a:hover {
          color: #007bff;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
