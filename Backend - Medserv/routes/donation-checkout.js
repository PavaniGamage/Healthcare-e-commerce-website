require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Donation = require("../models/Donation"); 

// Donation route
router.post('/create-donate-checkout-session', async (req, res) => {
    // const { amount, paymentMethod, email, name, phone, message, donationDate, donationRequestID } = req.body;
    
    try {
        const { amount, paymentMethod, email, name, phone, message, donationDate, donationID } = req.body;

        // Convert amount to a number
        const donationAmount = Number(amount);

        // Validate request data
        if (isNaN(donationAmount) || donationAmount < 1) {
            return res.status(400).json({ error: 'Invalid donation amount' });
        }
        if (!email || !name) { 
            return res.status(400).json({ error: 'Email and Name are required' });
        }

        if (!donationID) {
            return res.status(400).json({ error: "Donation request ID is missing." });
        }

        if (!amount) {
            return res.status(400).json({ error: "Amount is missing." });
        }

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'lkr',
                    product_data: {
                        name: `Donation from ${name} to DonationID: #REQ ${donationID}`,
                    },
                    unit_amount: donationAmount * 100, // Convert amount to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            customer_email: email,
            success_url: `http://localhost:5173/success-donation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel-donation?session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                name,
                email,
                phone,
                message,
                donationDate,
            },
        });

        // Find the document with the given donationID
        const donation = await Donation.findOne({ donationID });
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        // Update the existing document with payment details
        donation.paymentDetails = {
            userName: name,
            userEmail: email,
            userPhone: phone,
            message,
            donationAmount: amount,
            donationDate,
            paymentMethod,
            status: 'pending',
            sessionId: session.id,
        };
        donation.status = 'pending';
        donation.sessionId = session.id;

        try {
            await donation.save();
            console.log("Payment details updated:", donation);
        } catch (saveError) {
            console.error("Error saving order:", saveError);
            return res.status(500).json({ error: "Failed to update donation with payment details." });
        }

        // Send response back to the client
        res.status(200).json({
            sessionId: session.id,  
            donationId: donation.donationID,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error.message, error.stack);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Route to retrieve the session details from Stripe and update donation status
router.post('/get-donation-session', async (req, res) => {
    const { sessionId } = req.body;

    // Check if sessionId is provided
    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        // Retrieve the session details from Stripe using the session ID
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Handle case where session is not found
        if (!session) {
            return res.status(404).json({ error: 'Stripe session not found' });
        }

        // Extract the payment status and other relevant details from the session
        const sessionStatus = session.payment_status;  // 'paid', 'unpaid', etc.
        const paymentIntentId = session.payment_intent;

        // Update the donation status in the database using sessionId and sessionStatus
        const updatedDonation = await Donation.findOneAndUpdate(
            { sessionId: sessionId },  // Use sessionId field for querying
            { status: sessionStatus, paymentIntentId: paymentIntentId },  // Update status and paymentIntentId
            { new: true }  // Ensure the updated donation is returned
        );

        // If donation is not found in the database, handle the error
        if (!updatedDonation) {
            return res.status(404).json({ error: 'Donation not found in database' });
        }

        // Return the updated donation status
        res.status(200).json({
            success: true,
            donation: updatedDonation,  // Return the updated donation document
            sessionStatus,
            paymentIntentId,
            sessionId: session.id,
            paymentMethodTypes: session.payment_method_types,
            customerEmail: session.customer_email,
        });
    } catch (error) {
        console.error('Error retrieving Stripe session or updating donation status:', error.message);

        // Send detailed error information for easier debugging
        res.status(500).json({
            error: 'Server error. Please try again later.',
            details: error.message,  // Include error details in the response for debugging
        });
    }
});

// Send the bill via email
router.post('/send-donation-session-details', async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Stripe session not found' });
        }

        // Fetch the last invoiceID and increment
        const getNextInvoiceID = async () => {
            const lastInvoice = await Donation.findOne().sort({ billInvoiceID: -1 }).limit(1);
            
            // Debugging: Check the value of lastInvoice and lastInvoice.billInvoiceID
            console.log('Last Invoice:', lastInvoice);
            
            if (lastInvoice && lastInvoice.billInvoiceID) {
                return parseInt(lastInvoice.billInvoiceID, 10) + 1;
            } else {
                return 1; // Default to 1 if no previous invoice is found
            }
        };

        // Generate the next invoiceID
        const invoiceID = await getNextInvoiceID();

        // Debugging: Check the calculated invoiceID
        console.log('Calculated invoiceID:', invoiceID);

        // Check if invoiceID is a valid number
        if (isNaN(invoiceID)) {
            return res.status(500).json({ error: 'Invalid invoiceID calculation' });
        }

        // Update the invoiceID in the database
        const updatedInvoice = await Donation.findOneAndUpdate(
            { sessionId: sessionId },  
            { billInvoiceID: invoiceID },  
            { new: true }  
        );

        // If the donation is not found in the database
        if (!updatedInvoice) {
            return res.status(404).json({ error: 'Donation not found in database' });
        }

        const billDetails = {
            customerEmail: session.customer_email,
            invoiceNumber: `INV-${invoiceID}-MEDSERV-E-RECEIPT`,  // Use invoiceID in the format
            date: new Date(session.created * 1000).toLocaleDateString(),
            status: session.payment_status || 'unknown',
            amount: (session.amount_total / 100).toFixed(2),
            currency: session.currency.toUpperCase(),
            paymentMethodTypes: session.payment_method_types.join(', '),
        };

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: billDetails.customerEmail,
            from: process.env.EMAIL_USER,
            subject: 'Donation Receipt',
            html: `
                <h1>Thank you for your donation!</h1>
                <p>Below are the details of your transaction:</p>
                <ul>
                    <li><strong>Invoice Number:</strong> ${billDetails.invoiceNumber}</li>
                    <li><strong>Date:</strong> ${billDetails.date}</li>
                    <li><strong>Status:</strong> ${billDetails.status}</li>
                    <li><strong>Amount:</strong> ${billDetails.amount} ${billDetails.currency}</li>
                    <li><strong>Payment Method:</strong> ${billDetails.paymentMethodTypes}</li>
                    <li><strong>Email:</strong> ${billDetails.customerEmail}</li>
                </ul>
                <p>Thank you for support!</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            sessionId: session.id,
            customerEmail: session.customer_email,
            message: `We've sent the E-Receipt to your email: ${session.customer_email}. Thank you.`,
        });
    } catch (error) {
        console.error('Error retrieving Stripe session or updating donation status:', error.message);
        res.status(500).json({
            error: 'Server error. Please try again later.',
            details: error.message,
        });
    }
});

module.exports = router;
