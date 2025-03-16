import React, { useState, useEffect } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import "./WebPages CSS/LoginSignup.css";
import "./WebPages CSS/UploadPrescriptions.css";
import { loadStripe } from "@stripe/stripe-js";

const Donation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, donationID } = location.state || {}; 
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    donationID:"",
    name: "",
    email: "",
    phone: "",
    amount: amount || "",
    message: "",
    paymentMethod: "card",
    donationDate: "",
    termsAndConditions: false,
  });

  // Redirect if amount is null
  useEffect(() => {
    if (!amount) {
      navigate("/make-donation"); 
    }
  }, [amount, navigate]);

  useEffect(() => {
    // Set today's date as the default value
    const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    setDonationDetails((prevDetails) => ({
      ...prevDetails,
      donationDate: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationDetails({
      ...donationDetails,
      [name]: value,
    });
    setDonationDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        name === "amount"
          ? Number(value.replace('Rs.', '').trim())
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if the user is logged in
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      if (!token || !userEmail) {
        alert("Please log in to proceed with the donation.");
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      // Validate the minimum donation amount
      if (!donationDetails.amount || donationDetails.amount < 500) {
        alert("Minimum donation is Rs. 500.00.");
        setLoading(false);
        return;
      }

      // check for id
      if (!donationID) { 
        alert("Donation ID is missing. Cannot Proceed.");
        setError("Donation ID is missing. Cannot Proceed.");
        setLoading(false);
        return;
      }

      const payload = {
        amount: donationDetails.amount,
        paymentMethod: donationDetails.paymentMethod,
        email: donationDetails.email,
        name: donationDetails.name,
        phone: donationDetails.phone,
        message: donationDetails.message,
        donationDate: donationDetails.donationDate,
        donationID: donationID, 
      };

      console.log("Payload:", payload);

      const response = await fetch(
        "http://localhost:4000/api/donate/create-donate-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      // Ensure the response is OK before proceeding
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create checkout session.");
      }
  
      const data = await response.json();  
      console.log('Success:', data);
  
      const { sessionId } = data;
      if (!sessionId) throw new Error("Failed to retrieve session ID.");

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error("Error:", err.message);
      alert(err.message || "An error occurred. Please try again later.");
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> 
      <div>
        <section className="grid bg-[#000] bg-opacity-90 p-4 mx-auto items-center justify-center">
          <div className="grid max-w-screen-xl ml-10 px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-white dark:text-white">
                Your Health - Our Priority
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-white">
                Medserv brings healthcare to rural Sri Lanka. Join us in
                building a healthier future.
              </p>

              <a
                href="/application"
                className="inline-flex items-center justify-center px-7 py-3 mr-3 text-base font-medium text-center text-white bg-[#f2ae00] rounded-xl hover:bg-[#deb03a] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-underline"
              >
                Apply for Donation
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://cdn.pixabay.com/photo/2016/12/21/10/10/begging-1922612_640.png"
                alt="mockup"
                className="w-full h-auto max-w-xs rounded-xl" // Round border and size control
              />
            </div>
          </div>
        </section>
      </div>
      <div>
        <section className="flex justify-center items-center mx-auto">
          <div className="w-full flex flex-col lg:flex-row justify-center">
            {/* Left Part */}
            <section className="flex items-center justify-center">
              <div className="contact" id="contact-for-reservation">
              <h2 className="text-2xl font-semibold text-center">Making Donations</h2>
                <p> Your support makes a difference. Thank you for contributing! </p>

                <p>Please contact us for more details about donations.</p>
                <p className="contact-topic">Contact Details:</p>
                <p>
                  <strong>Email: </strong> medserv@gmail.com
                </p>
                <p>
                  <strong>Phone: </strong> +94 11 2345678
                </p>
              </div>
            </section>

            {/* Right Part (Form) */}
            <div className="form-container lg:pl-0 lg:pr-0 lg:w-[550px]">
              <div className="new-user lg:ml-[50px]">
                <div className="register-heading text-center mb-10 mt-10">
                  <h2>Make Donations</h2>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="register donations">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        className="text-base"
                        value={donationDetails.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="text-base"
                        value={donationDetails.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="text-base"
                        value={donationDetails.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group amount">
                      <input
                        type="text" 
                        id="amount"
                        name="amount"
                        placeholder="Amount (Rs.)"
                        required
                        min="500"
                        className="text-base"
                        value={`Rs. ${donationDetails.amount}.00`} 
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Message"
                        className="text-base message-input w-full h-[50px] rounded-[5px] border p-[12px] resize-y"
                        value={donationDetails.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group donation-select">
                      <label
                        htmlFor="paymentMethod"
                        className="block field-topic"
                      >
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={donationDetails.paymentMethod}
                        onChange={handleChange}
                        className="select message-input"
                        required
                      >
                        <option value="card">Credit Card</option>
                        <option value="bankTransfer" disabled>
                          Bank Transfer
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="donationDate"
                        className="block field-topic"
                      >
                        Donation Date
                      </label>
                      <input
                        type="date"
                        id="donationDate"
                        name="donationDate"
                        required
                        className="text-base message-input"
                        value={donationDetails.donationDate}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="check check-donations">
                      <input
                        type="checkbox"
                        id="termsAndConditions"
                        name="termsAndConditions"
                        required
                        checked={donationDetails.termsAndConditions}
                        onChange={handleChange}
                      />
                      <label htmlFor="termsAndConditions">
                        I agree with terms and conditions.
                      </label>
                    </div>

                    <div className="flex justify-center w-full h-[100px] items-center">
                      <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Donate"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Donation;
