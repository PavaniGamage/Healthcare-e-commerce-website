const mongoose = require("mongoose");

const donationCounterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
});

const Counter = mongoose.model("Medserv_Donation_Counter", donationCounterSchema);

module.exports = Counter;
