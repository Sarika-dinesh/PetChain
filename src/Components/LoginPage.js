import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import DogWalk from '../Assets/dogwalk.svg';

function LoginPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // Track the selected role

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // Update the selected role
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-In Form */}
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Password" />
            </div>
            <button className="btn">Login</button>
          </form>

          {/* Sign-Up Form */}
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="Name" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Confirm Password" />
            </div>
            <div className="input-field">
              <select
                className="dropdown"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="owner">Owner</option>
                <option value="doctor">Doctor</option>
                <option value="insurance-provider">Insurance Provider</option>
              </select>
            </div>

            {/* Dynamic Fields Based on Role */}
            {selectedRole === "owner" && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input type="text" placeholder="Address" />
              </div>
            )}
            {selectedRole === "doctor" && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input type="text" placeholder="License Number" />
              </div>
            )}
            {selectedRole === "insurance-provider" && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input type="text" placeholder="Company Name" />
              </div>
            )}

            <button className="btn">Sign Up</button>
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
