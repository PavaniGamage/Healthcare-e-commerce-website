import React from "react";
import { useEffect, useState } from 'react';
import "./CancelPage.css";

const CancelPage = () => {
  const [error, setError] = useState(null);
  
    useEffect(() => {
      const sendSessionStatus = async () => {
        // Get the session_id from the URL query parameters
        const session_id = new URLSearchParams(window.location.search).get('session_id');
        const email = localStorage.getItem('userEmail');

        if (session_id || email) {
          const status = "cancel"; // Set the status as 'success'
  
          try {
            const response = await fetch('http://localhost:4000/api/checkout/checkout-session-status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                session_id: session_id,
                status: status,
                userEmail: email,
              }), // Sending session_id and status as JSON to the backend
            });
  
            // Check if the response is successful
            if (response.ok) {
              const data = await response.json();
              console.log('Backend response:', data);
              // Handle any additional response logic here
            } else {
              throw new Error('Failed to send session status');
            }
          } catch (err) {
            setError('An error occurred while sending the session status');
            console.error('Error:', err);
          }
        } else {
          setError('Session ID is missing');
        }
      };
  
      sendSessionStatus();
    }, []);

  return (
    <div className="cancel-container">
    <div className="cancel-card">
      <div className="cancel-icon">❌</div>
      <h2>Payment Canceled</h2>
      <p>Your payment was canceled. Please try again.</p>
      <a href="/" className="cancel-button">Return to Home</a>
    </div>
  </div>
  );
};

export default CancelPage;
