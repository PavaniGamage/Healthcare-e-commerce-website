import React from "react";
import "./CancelPage.css";

const CancelPage = () => {
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
