import React, { useState } from 'react';
import "../WebPages/WebPages CSS/ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //  route in backend like /api/auth/forgot-password
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }), 
      });

      const data = await response.json(); // Assuming backend returns a JSON response

      if (response.ok) {
        setMessage('Password reset email sent! Please check your inbox.');
        setEmail(''); // Optionally reset email field after success
      } else {
        setMessage(data.message || 'Error sending email. Please try again later.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <p>Enter your registered email, and we’ll send you a reset link.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ForgotPasswordPage;
