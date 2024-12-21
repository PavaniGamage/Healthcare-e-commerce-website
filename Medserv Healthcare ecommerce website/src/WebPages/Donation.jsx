import React, { useState, useEffect } from 'react';
import './WebPages CSS/LoginSignup.css';
import './WebPages CSS/UploadPrescriptions.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Donation = () => {
    // const [donationDetails, setDonationDetails] = useState({
    //     name: '',
    //     email: '',
    //     phone: '',
    //     amount: '',
    //     message: '',
    //     paymentMethod: 'creditCard',
    //     donationDate: '',
    //   });
    
    //   const [loading, setLoading] = useState(false);
    //   const [stripe, setStripe] = useState(null);
    //   const [elements, setElements] = useState(null);

    //   useEffect(() => {
    //     const initializeStripe = async () => {
    //         const stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    //         setStripe(stripeInstance);
    //     };

    //     initializeStripe();
    //   }, []);

    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setDonationDetails((prevDetails) => ({
    //       ...prevDetails,
    //       [name]: value,
    //     }));
    //   };
    
    //   const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (!stripe) {
    //         console.log("Stripe.js has not loaded yet.");
    //         return;
    //     }

    //     if (!elements) {
    //         console.log("Stripe.js has not loaded yet.");
    //         return;
    //     }

    //     setLoading(true);

    //     const donationDetails = {
    //         name: event.target.name.value,
    //         email: event.target.email.value,
    //         phone: event.target.phone.value,
    //         amount: parseFloat(event.target.amount.value),
    //         message: event.target.message.value,
    //         paymentMethod: event.target.paymentMethod.value,
    //         donationDate: event.target.donationDate.value,
    //     };
    
    //     try {
    //       const response = await fetch('http://localhost:4000/api/donate/create-donate-checkout-session', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(donationDetails),
    //       });
    
    //       const data = await response.json();
    //       const { clientSecret, donationId } = data;
    
    //       // Confirm the card payment with Stripe
    //       const { error } = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //           card: elements.getElement(CardElement),
    //           billing_details: {
    //             name: donationDetails.name,
    //             email: donationDetails.email,
    //           },
    //         },
    //       });
    
    //       if (error) {
    //         console.error('Payment failed', error);
    //       } else {
    //         // Payment successful, update donation status on the backend
    //         const updateStatusResponse = await fetch('http://localhost:4000/api/donate/update-donation-status', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 donationId,
    //                 status: 'success',
    //             }),
    //         });

    //         const updateStatusData = await updateStatusResponse.json();
    //         if (updateStatusData.success) {
    //             console.log('Donation status updated to success');
    //         } else {
    //             console.error('Error updating donation status');
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Error during donation submission', error);
    //       setLoading(false);
    //     }
    // };

    const [error, setError] = useState('');
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false);
    const [donationDetails, setDonationDetails] = useState({
        name: '',
        email: '',
        phone: '',
        amount: '',
        message: '',
        paymentMethod: 'card',
        donationDate: '',
        termsAndConditions: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDonationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: name === 'amount' ? Number(value) : type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if the user is logged in
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('userEmail');
        
            if (!token || !userEmail) {
                alert('Please log in to proceed with the donation.');
                setError('User is not logged in.');
                setLoading(false);
                return;
            }

            // Validate the minimum donation amount
            if (!donationDetails.amount || donationDetails.amount < 500) {
                alert('Minimum donation is Rs. 500.00.');
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
            };

            console.log("Payload:", payload);                      
        
            const response = await fetch("http://localhost:4000/api/donate/create-donate-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
                // body: JSON.stringify({ donation: donationDetails, email: userEmail }),
                body: JSON.stringify(payload),
            });

            const data = await response.json();
        
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to create checkout session.');
            }
        
            // Get sessionId from response
            const { sessionId } = data;
            if (!sessionId) throw new Error('Failed to retrieve session ID.');

            console.log(data);

            // Redirect to Stripe Checkout
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
            await stripe.redirectToCheckout({ sessionId });
            
        } catch (err) {
            console.error('Error:', err.message);
            alert(err.message || 'An error occurred. Please try again later.');
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
        <section className="flex justify-center items-center">          
              <div className='contact' id='contact-for-reservation'>
                  <p>Please contact us for more details about donations.</p>
                  <p className='contact-topic'>Contact Details:</p>
                  <p><strong>Email: </strong> medserv@gmail.com</p>
                  <p><strong>Phone: </strong> +94 11 2345678</p>
              </div>                  
        </section>

        <section className="flex justify-center items-center">          
            <div className="form-container w-[550px] mx-auto flex flex-col">
                <div className='new-user'>
                    <div className='register-heading text-center mb-10 mt-10'>
                    <h2>Make Donations</h2> 
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="register donations">
                            <div className="form-group">
                            <input
                                type="text" id="name" name="name" placeholder="Name" required
                                className="text-base"
                                value={donationDetails.name}
                                onChange={handleChange}
                            />
                            </div>
                            
                            <div className="form-group">
                            <input
                                type="email" id="email" name="email" placeholder="Email" required
                                className="text-base"
                                value={donationDetails.email}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="form-group">
                            <input
                                type="tel" id="phone" name="phone" placeholder="Phone Number" required
                                className="text-base"
                                value={donationDetails.phone}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="form-group amount">
                            <input
                                type="number"
                                id="amount" name="amount" placeholder="Amount (Rs.)" required
                                min="500"
                                className="text-base"
                                value={donationDetails.amount}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="form-group">
                            <textarea
                                id="message" name="message" placeholder="Message"                                                           
                                className="text-base message-input w-full h-[50px] rounded-[5px] border p-[12px] resize-y"
                                value={donationDetails.message}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="form-group donation-select">
                            <label htmlFor="paymentMethod" className="block field-topic">
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
                                    <option value="bankTransfer" disabled>Bank Transfer</option>
                                </select>
                            </div>

                            <div className="form-group">
                            <label htmlFor="donationDate" className="block field-topic">
                                Donation Date
                            </label>
                            <input
                                type="date" id="donationDate" name="donationDate" required
                                className="text-base message-input"   
                                value={donationDetails.donationDate}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="check check-donations">
                            <input
                                type="checkbox" id="termsAndConditions" name="termsAndConditions" required
                                checked={donationDetails.termsAndConditions}
                                onChange={handleChange}
                            />
                            <label htmlFor="termsAndConditions">
                                I agree with terms and conditions.
                            </label>
                            </div>

                            <div className="flex justify-center w-full h-[100px] items-center">
                                <button type="submit" disabled={(loading)}>
                                    {loading ? 'Processing...' : 'Donate'}
                                </button>
                            </div>
                        </div>
                    </form>            
                </div>
            </div>                 
        </section>
    </div>
  )
}

export default Donation 