import React, { useEffect , useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Donation.css";
  
const CancelPage = () => {
  const location = useLocation();  // To access the URL query params
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const updateDonationStatus = async () => {
      if (!sessionId) {
        return;
      }

      setLoading(true);  // Set loading state while waiting for the API response

      try {
        const response = await axios.post("http://localhost:4000/api/donate/get-donation-session", {
          sessionId,
        });

        if (response.data.success) {
          // Update UI to show success
          setSuccess(true);
          console.log("Donation canceled", response.data);
        } else {
          // If response is not successful, show an error
          setError("Donation update failed");
        }
      } catch (error) {
        console.error("Error updating donation status", error);
        // Set error state to show in the UI
        setError("An error occurred while updating the donation status");
      } finally {
        setLoading(false);  // Reset loading state after request is complete
      }
    };

    updateDonationStatus();
  }, [sessionId]);

  return (
    <div className="cancel-container">
    <div className="cancel-card">
      <div className="cancel-icon">❌</div>
      <h2>Donation Canceled</h2>
      <p>Your donation was canceled. Please try again.</p>
      <a href="/donation" className="cancel-button">Return to Donation</a>
    </div>
  </div>
  );
};

export default CancelPage;
