require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Prescription = require("../models/Prescription"); 

router.post('/create-prescription-checkout-session', async (req, res) => {
    const { amount, paymentMethod, email, name, phone, paymentDate, orderID } = req.body;
    
    try {
        const paymentAmount = Number(amount);

        // Validate request data
        if (isNaN(paymentAmount) || paymentAmount < 1) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        if (!email || !name) { 
            return res.status(400).json({ error: 'Email and Name are required' });
        }

        // Find the document with the given orderID
        const order = await Prescription.findOne({ orderID });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (!orderID) {
            return res.status(400).json({ error: "Order ID is required." });
        }        

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'lkr',
                    product_data: {
                        name: `Payment for the Prescription from ${name}`,
                    },
                    unit_amount: paymentAmount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            customer_email: email,
            success_url: `http://localhost:5173/success-prescription-payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel-prescription-payment?session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                name,
                email,
                phone,
                paymentDate,
            },
        });

        // Update the existing document with payment details
        order.paymentDetails = {
            name: name,
            email: email,
            phone: phone,
            paymentAmount: paymentAmount,
            paymentDate: paymentDate,
            paymentMethod: paymentMethod,
            sessionId: session.id,
        };
        order.status = 'pending';

        // await order.save();
        // console.log("Payment details updated:", order);
        try {
            await order.save();
            console.log("Payment details updated:", order);
        } catch (saveError) {
            console.error("Error saving order:", saveError);
            return res.status(500).json({ error: "Failed to update order with payment details." });
        }

        // Send response back to the client
        res.status(200).json({
            sessionId: session.id,  
            orderID: orderID,
        });
    } catch (error) {
        console.error('Error creating payment session:', error.message, error.stack);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Route to retrieve the session details from Stripe and update status
router.post('/get-prescription-payment-session', async (req, res) => {
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

        const updatedPrescription = await Prescription.findOneAndUpdate(
            { "paymentDetails.sessionId": sessionId },
            { $set: { "status": sessionStatus } },
            { new: true }
        );        

        // If payment is not found in the database, handle the error
        if (!updatedPrescription) {
            return res.status(404).json({ error: 'Prescription not found in database' });
        }

        // Return the updated status
        res.status(200).json({
            success: true,
            prescription: updatedPrescription,  
            sessionStatus,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('Error retrieving Stripe session or updating payment status:', error.message);

        // Send detailed error information for easier debugging
        res.status(500).json({
            error: 'Server error. Please try again later.',
            details: error.message,  // Include error details in the response for debugging
        });
    }
});

// Send the bill via email
router.post('/send-prescription-payment-session-details', async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Stripe session not found' });
        }

        // Fetch the latest prescription to get the last invoice ID
        const lastPrescription = await Prescription.findOne({}).sort({ "paymentDetails.billInvoiceID": -1 }).exec();
        const invoiceID = lastPrescription?.paymentDetails?.billInvoiceID ? lastPrescription.paymentDetails.billInvoiceID + 1 : 1;

        // Update payment record
        const updatedInvoice = await Prescription.findOneAndUpdate(
            { "paymentDetails.sessionId" : sessionId },
            { "paymentDetails.billInvoiceID" : invoiceID },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ error: "Upload's payment not found in database" });
        }

        const billDetails = {
            customerEmail: session.customer_email,
            invoiceNumber: `INV-PRES-${invoiceID}-MEDSERV-E-RECEIPT`,
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
            subject: 'Prescription Payment Receipt',
            html: `
                <h1>Thank you for your payment!</h1>
                <p>Below are the details of your transaction:</p>
                <ul>
                    <li><strong>Invoice Number:</strong> ${billDetails.invoiceNumber}</li>
                    <li><strong>Date:</strong> ${billDetails.date}</li>
                    <li><strong>Status:</strong> ${billDetails.status}</li>
                    <li><strong>Amount:</strong> ${billDetails.amount} ${billDetails.currency}</li>
                    <li><strong>Payment Method:</strong> ${billDetails.paymentMethodTypes}</li>
                    <li><strong>Email:</strong> ${billDetails.customerEmail}</li>
                </ul>
                <p>Thank you for your payment!</p>
                <p>If you have any questions about this payment, contact us at support@medserv.com.</p>
            `,
        };

        // await transporter.sendMail(mailOptions);
        try {
            await transporter.sendMail(mailOptions);
        } catch (mailError) {
            console.error("Error sending email:", mailError);
            return res.status(500).json({ error: 'Error sending email. Please try again later.' });
        }

        res.status(200).json({
            success: true,
            sessionId: session.id,
            customerEmail: session.customer_email,
            message: `We've sent the E-Receipt to your email: ${session.customer_email}. Thank you.`,
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;