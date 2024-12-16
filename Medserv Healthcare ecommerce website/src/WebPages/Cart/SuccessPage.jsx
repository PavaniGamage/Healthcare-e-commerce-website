import React from "react";
import { useEffect, useState } from 'react';
import "./SuccessPage.css";

const SuccessPage = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendSessionStatus = async () => {
      // Get the session_id from the URL query parameters
      const session_id = new URLSearchParams(window.location.search).get('session_id');
      
      if (session_id) {
        const status = "success"; // Set the status as 'success'

        try {
          const response = await fetch('http://localhost:4000/api/checkout/checkout-session-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: session_id,
              status: status,
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
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Payment Successful</h2>
        <p>Thank you for your payment!</p>
        <a href="/" className="success-button">Continue Shopping</a>
      </div>
    </div>
  );
};

export default SuccessPage;
