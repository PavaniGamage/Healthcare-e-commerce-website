const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number}, 
    availability: { type: String, enum: ["Available", "Not Available"], required: true },
    description: { type: String, default: "-" },
    subDescription: { type: String, default: "-" },
    keywords: { type: String, default: "-" }, // Can also be an array
    rating: { type: Number, min: 0, max: 5, default: 0 },
    imageSource: { type: String, enum: ["url", "file"], required: true },
    imageUrl: { type: String, default: "-" },
    category1: { type: String, default: "-" },
    category2: { type: String, default: "-" },
    itemType: { type: String, enum: ["Rent", "Sell"], required: true },
    dailyRental: { type: Number, default: 0 },
    weeklyRental: { type: Number, default: 0 },
    monthlyRental: { type: Number, default: 0 },
    deposit: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
}, { collection: "medserv_products" }); // Specify collection name

// Create the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;