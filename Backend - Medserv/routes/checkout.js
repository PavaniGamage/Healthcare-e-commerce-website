require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const Product = require("../models/Product");

// Create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products, userEmail } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    if (!userEmail) {
      return res.status(400).json({ error: "User not logged in." });
    }

    // Check if there is enough stock for each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const dbProduct = await Product.findById(product.itemId); 

      if (!dbProduct) {
        return res.status(400).json({ error: `Product with ID ${product.itemId} not found` });
      }

      // Check if the requested quantity is available in stock
      if (product.quantity > dbProduct.quantity) {
        // return res.status(400).json({ error: `Insufficient stock for ${product.name}. Only ${dbProduct.quantity} available.` });
        return res.status(400).json({
          status: "error",
          message: `Insufficient stock for the requested product.`,
          details: `Only ${dbProduct.stock || 0} units of '${product.name}' are available, but you requested ${product.quantity} units.`,
          errorCode: "STOCK_NOT_ENOUGH"
        });
      }
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
        success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/cancel?session_id={CHECKOUT_SESSION_ID}`,
    }); 
    
    console.log("Stripe session created:", session);
    console.log("Received body in Backend:", req.body);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Unable to create session' });
  }
});

// Getting Order details and save into database
router.post('/checkout-session-status', async (req, res) => {
  const { session_id, status, userEmail } = req.body;

  if (session_id && status && userEmail) {
    try {
      // Fetch the Stripe Checkout session
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (session) {
        // Retrieve the purchased items from session.line_items (if available)
        const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {
          // limit: 100, // Limit the number of items retrieved
          expand: ['data.price.product'],
        });

        // Check if lineItems are available
        if (lineItems.data.length === 0) {
          return res.status(400).json({ message: 'No products found in the session' });
        }

        // Prepare the products data
        const products = lineItems.data.map(item => ({
          name: item.description,
          price: item.amount_total / 100, // Convert from cents to dollars
          quantity: item.quantity,
          images: item.price.product.images && item.price.product.images.length > 0 ? item.price.product.images : [],
        }));                 

        console.log(products);

        // Calculate the total amount
        const totalAmount = session.amount_total / 100; 

        // Fetch the last orderID and increment
        const getNextOrderID = async () => {
          const lastOrder = await Order.findOne().sort({ orderID: -1 }).limit(1); // Find the order with the highest orderID
          return lastOrder ? lastOrder.orderID + 1 : 1; // If no orders exist, start from 1
        };

        // Generate the orderID
        (async () => {
          try {
            const orderID = await getNextOrderID(); // Get the next orderID

            // Create the order document
            const order = new Order({
              userEmail: userEmail || '-',
              products,
              totalAmount,
              sessionId: session.id,
              status: status,
              orderID,
            });

            await order.save(); // Save the order to the database
            console.log('Order created successfully:', order);

            // Process the session data and items
            console.log(`Session ID: ${session_id}`);
            console.log(`Status: ${status}`);
            console.log('Purchased Products:', lineItems);

            if (session.payment_status === "paid") {
              const lineItems = await stripe.checkout.sessions.listLineItems(session_id);
        
              for (const item of lineItems.data) {
                const dbProduct = await Product.findOne({ name: item.description });
        
                if (dbProduct) {
                  dbProduct.quantity = Math.max(0, dbProduct.quantity - item.quantity);
                  
                  if (dbProduct.quantity === 0) {
                    dbProduct.availability = 'Not Available'; 
                  }

                  await dbProduct.save();
                  console.log(`Updated stock for ${dbProduct.name}: ${dbProduct.quantity} remaining.`);
                }
              }
        
              return res.json({ status: "paid" });
            }

            // Access details / product info
            res.json({
              message: 'Session status received successfully',
              products: lineItems.data, // Send the purchased products to the frontend
              order: order, 
            });
          } catch (error) {
            console.error('Error creating order:', error);
          }
        })();
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      res.status(500).json({ message: 'Error retrieving session details' });
    }
  } else {
    // Handle missing data
    res.status(400).json({ message: 'Session ID or Status is missing' });
  }
});

module.exports = router;

