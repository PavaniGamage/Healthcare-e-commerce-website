require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map((product) => ({
          price_data: {
            currency: 'lkr',
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100), 
          },
          quantity: product.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    }); 
    
    console.log("Stripe session created:", session);
    console.log("Received body in Backend:", req.body);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Unable to create session' });
  }
});

module.exports = router;

