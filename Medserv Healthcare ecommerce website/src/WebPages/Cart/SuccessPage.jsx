import React from "react";
import "./SuccessPage.css";

const SuccessPage = () => {
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
