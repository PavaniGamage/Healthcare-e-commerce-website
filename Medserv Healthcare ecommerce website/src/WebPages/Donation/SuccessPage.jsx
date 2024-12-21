import React, { useEffect , useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Donation.css";
  
const SuccessPage = () => {
  const location = useLocation();  // To access the URL query params
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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
          console.log("Donation successful", response.data);
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

  useEffect(() => {
    const sendEBill = async () => {
      if (!sessionId) {
        setError("Session ID is required");
        return;
      }

      setLoading(true);  // Set loading state while waiting for the API response
      setError(null);

      try {
        const response = await axios.post("http://localhost:4000/api/donate/send-donation-session-details", {
          sessionId,
        });

        if (response.data.success) {
          // Update UI to show success
          setSuccess(true);
          setSuccessMessage(response.data.customerEmail || '-');  
          console.log("Sent the E-Receipt successfully", response.data);
        } else {
          // If response is not successful, show an error
          setError("Sending the E-Receipt failed");
        }
      } catch (error) {
        console.error("Error sending the receipt", error);
        // Set error state to show in the UI
        setError("An error occurred while sending the receipt");
      } finally {
        setLoading(false);  // Reset loading state after request is complete
      }
    };

    sendEBill();
  }, [sessionId]);

  return (
    <div className="success-container flex-col h-full p-10 gap-10">
      <div className="success-card">
        <div className="success-icon">✅</div> 
        <h2>Donation Successful</h2>
        <p>Thank you for your donation!</p>
        <a href="/" className="success-button">Return to Home</a>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {success && successMessage  && <div className="bg-white rounded-[10px] p-3 shadow">
                      <p>We've sent the E-Receipt to your email:  
                        <a href='#' className="font-bold ml-2">{successMessage}</a>.
                      </p>
                      <p>Thank you.</p>
                    </div>}  
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SuccessPage;
