const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;
    // const products = [
    //     { name: "Product 1", price: 20.0, quantity: 2, image: "https://example.com/image.jpg" }
    // ];

    // Validate the input
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    // Map products to Stripe line items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: product.image ? [product.image] : [],
        },
        unit_amount: Math.round(product.price * 100), // Stripe expects amounts in cents
      },
      quantity: product.quantity,
    }));

    // // Create a checkout session
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: lineItems,
    //   mode: 'payment',
    //   success_url: `${process.env.CLIENT_URL}/success`,
    //   cancel_url: `${process.env.CLIENT_URL}/cancel`,
    // });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100), // Ensure price is a valid number
          },
          quantity: product.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:4000/success',
        cancel_url: 'http://localhost:4000/cancel',
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

