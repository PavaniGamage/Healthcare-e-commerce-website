const mongoose = require("mongoose");

// Define the schema
const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
}, { collection: "medserv_feedbacks" });

// Create the model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;