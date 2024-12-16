const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  orderID: { type: Number, required: true, unique: true },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      images: {type: [String]},
    },
  ],
  totalAmount: { type: Number, required: true },
  sessionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['success', 'cancel'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Medserv_Orders', OrderSchema);

module.exports = Order;
