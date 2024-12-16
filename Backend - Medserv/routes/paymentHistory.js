const express = require('express');
const router = express.Router();
const Order = require("../models/Order");

// Getting Order History from Database
// POST route for feedback
router.get('/orders/:email', async (req, res) => {
    try {
      const customerEmail = req.params.email;
      const orders = await Order.find({ customerEmail });
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this email' });
      }
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
});

// GET route for fetching order details by orderID
router.get('/orders_details/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params; 
    const order = await Order.findOne({ orderID }); 
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found for this ID' });
    }
    
    res.status(200).json(order); 
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'An error occurred while fetching order' });
  }
});
  
module.exports = router;