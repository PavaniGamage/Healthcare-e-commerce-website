const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  donationID: { type: Number, required: true, unique: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  donationAmount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'cancel', 'pending', 'completed', 'failed'], default: 'pending', required: true },
  message: { type: String },
  paymentMethod: { type: String, enum: ['card', 'bankTransfer'], required: true },
  donationDate: { type: Date, default: Date.now },
  billInvoiceID: {type: Number},
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Medserv_Donations', DonationSchema);

module.exports = Donation;