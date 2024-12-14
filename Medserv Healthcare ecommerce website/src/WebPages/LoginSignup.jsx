import React, { useState } from 'react';
import './WebPages CSS/LoginSignup.css';
import axios from '../Utilities/axios'; 
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  // Define states for login and signup form inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerMobile, setRegisterMobile] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerCity, setRegisterCity] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();  // Use useNavigate hook to navigate
  const API_BASE_URL = 'http://localhost:7000';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Reset previous errors
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signin`, {
        email: loginEmail,
        password: loginPassword,
      });
  
      console.log('Login successful', response.data);
  
      // Save the token securely
      localStorage.setItem('token', response.data.token);
  
      // Redirect to the dashboard
      navigate('/upload_prescriptions');
    } catch (error) {
      console.error('Login error', error);
  
      // Set error message based on backend response
      setLoginError(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };
  

  // Handle Register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(''); // Reset previous errors

    // Validate password confirmation
    if (registerPassword !== confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    try {
      const payload = {
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        mobile: registerMobile,
        address: registerAddress,
        city: registerCity,
        password: registerPassword,
        confirmPassword: confirmPassword,
      };
      console.log('Sending payload:', payload);
      const response = await axios.post(`http://localhost:7000/api/auth/signup`, payload);
      console.log('Registration successful', response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration error', error.response || error.message);
      setRegisterError(error.response?.data?.message || 'Registration failed');

    }
  }    

  return (
    <div className="form-container">
      {/* Existing User Login */}
      <div className="existing-user">
        <div className="signIn-heading">
          <h3>Are you registered?</h3>
          <p>If you have an account with us, log in using your email address</p>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <a href="/forgot-password" className="new-password">Forgot your password?</a>
          </div>
          <button type="submit">Sign In</button>
          {loginError && <div className="error-message">{loginError}</div>} {/* Display login error */}
        </form>
      </div>

      {/* New User Registration */}
      <div className="new-user">
        <div className="register-heading">
          <h3>New to Medserv?</h3>
          <p>Fill following details to create an account</p>
        </div>
        <form onSubmit={handleRegisterSubmit}>
          <div className="register">
            <div className="form-group">
              <input
                type="text"
                id="first-name"
                name="firstName"
                placeholder="First Name"
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Last Name"
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email1"
                name="email"
                placeholder="Email Address"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                id="mobile-number"
                name="mobile"
                placeholder="Mobile Number"
                value={registerMobile}
                onChange={(e) => setRegisterMobile(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={registerAddress}
                onChange={(e) => setRegisterAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="select-form-group">
                <select
                  id="city"
                  name="city"
                  value={registerCity}
                  onChange={(e) => setRegisterCity(e.target.value)}
                  required
                  placeholder="Select your city"
                >
                  <option value="">Select your city</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Galle">Galle</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password1"
                name="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <p className="rule">
                Your password must be at least 8 characters long, containing letters and numbers.
              </p>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Register</button>
          {registerError && <div className="error-message">{registerError}</div>} {/* Display registration error */}
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
