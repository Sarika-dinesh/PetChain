import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Login.css'; // Custom styling
import DogWalk from '../Assets/dogwalk.svg';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    additionalInfo: "",
  });

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser) {
  //     navigate("/pprofile", { state: { username: storedUser.name } });
  //   }
  // }, [navigate]);

  const handleSignUpClick = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      additionalInfo: "",
    });
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      additionalInfo: "",
    });
    setIsSignUpMode(false);
  };

  const handleRoleChange = (e) => setSelectedRole(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // API Call: Register User
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: selectedRole,
          additional_info: selectedRole === "vet"
            ? { license_number: formData.additionalInfo }
            : selectedRole === "insurance-provider"
            ? { registration_number: formData.additionalInfo }
            : {},
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          additionalInfo: "",
        });
        console.log("cleared data");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("data-token");
      console.log(data.token);
      if (response.ok) {
        // Store token in localStorage
        localStorage.clear();
        localStorage.setItem("token", data.token);
        console.log(data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data

        alert("Login successful!");

        // Navigate based on the user's role
        const role = data.user.role;
        if (role === "vet") {
          navigate("/vet-profile", { state: { username: data.user.name } });
        } else if (role === "insurance-provider") {
          navigate("/insurance-profile", { state: { username: data.user.name } });
        } else {
          navigate("/pprofile", { state: { username: data.user.name } });
        }
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-In Form */}
          <form className="sign-in-form" onSubmit={handleSignIn}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <button className="btn" type="submit">Login</button>
          </form>

          {/* Sign-Up Form */}
          <form className="sign-up-form" onSubmit={handleSignUp}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <select
                className="dropdown"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="" disabled>Select Role</option>
                <option value="pet_owner">Pet Owner</option>
                <option value="vet">Vet Doctor</option>
                {/* <option value="insurance-provider">Insurance Provider</option> */}
              </select>
            </div>

            {/* Dynamic Fields Based on Role */}
            {selectedRole === "vet" && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="additionalInfo"
                  placeholder="License Number"
                  onChange={handleInputChange}
                />
              </div>
            )}
            {/* {selectedRole === "insurance-provider" && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="additionalInfo"
                  placeholder="Registration Number"
                  onChange={handleInputChange}
                />
              </div>
            )} */}
            {selectedRole === "pet_owner" && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="additionalInfo"
                  placeholder="Address"
                  onChange={handleInputChange}
                />
              </div>
            )}
            <button className="btn" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Join us! Please Sign up!</p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={DogWalk} className="image" alt="Dog walking illustration" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Click here to Login</p>
            <button onClick={handleSignInClick} className="btn transparent">
              Sign in
            </button>
          </div>
          <img src={DogWalk} className="image" alt="Dog walking illustration" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
