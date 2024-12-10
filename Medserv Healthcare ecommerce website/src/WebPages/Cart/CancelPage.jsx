import React from "react";

const CancelPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Canceled</h1>
      <p>It seems like you canceled the payment. If this was a mistake, please try again.</p>
      <a href="/cart">Go back to Cart</a>
    </div>
  );
};

export default CancelPage;
