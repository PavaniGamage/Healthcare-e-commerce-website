import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import "../WebPages/WebPages CSS/ForgotPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  // Extract token from the URL path using useEffect
  useEffect(() => {
    const tokenFromUrl = window.location.pathname.split('/')[2]; // Extract token from URL path
    setToken(tokenFromUrl); // Set the token state
  }, []);

  // Password validation function
  const passwordValidator = (password) => {
    // Password should be at least 8 characters long and contain letters and numbers
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Check if password is valid
    if (!passwordValidator(password)) {
      setMessage('Password must be at least 8 characters long and contain letters and numbers.');
      return;
    }

    try {
      // API call to reset the password
      const response = await axios.post(`http://localhost:7000/api/auth/reset-password/${token}`, {
        newPassword: password, // Use 'newPassword' to match backend
      });
      

      // Handle success response
      setMessage('Password reset successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/sign_in'; // Redirect to login page after successful reset
      }, 3000);
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response?.data?.message || 'An error occurred while resetting the password. Please try again.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
