import React, { useEffect , useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Prescription.css";
  
const CancelPage = () => {
  const location = useLocation();  // To access the URL query params
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const updateStatus = async () => {
      if (!sessionId) {
        return;
      }

      setLoading(true);  
      try {
        const response = await axios.post("http://localhost:4000/api/prescription-payment/get-prescription-payment-session", {
          sessionId,
        });

        if (response.data.success) {
          // Update UI to show success
          setSuccess(true);
          console.log("Payment canceled", response.data);
        } else {
          // If response is not successful, show an error
          setError("Payment status update failed");
        }
      } catch (error) {
        console.error("Error updating payment status", error);
        // Set error state to show in the UI
        setError("An error occurred while updating the payment status");
      } finally {
        setLoading(false);  // Reset loading state after request is complete
      }
    };

    updateStatus();
  }, [sessionId]);

  return (
    <div className="cancel-container">
    <div className="cancel-card">
      <div className="cancel-icon">❌</div>
      <h2>Payment Canceled</h2>
      <p>Your payment was canceled. Please try again.</p>
      <a href="/uploads_history" className="cancel-button">Return to Uploads</a>
    </div>
  </div>
  );
};

export default CancelPage;
