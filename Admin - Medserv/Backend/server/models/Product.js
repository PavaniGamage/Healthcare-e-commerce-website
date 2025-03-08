const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    oldPrice: {
        type: Number,
        default: null
    },
    quantity: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        // enum: ["Available", "Not Available"],
        required: true
    },
    description: {
        type: String,
        default: "-"
    },
    subDescription: {
        type: String,
        default: "-"
    },
    keywords: {
        type: String, // Can also be an array 
        default: "-"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    imageSource: {
        type: String,
        enum: ["url", "file"],
        required: true
    },
    imageUrl: {
        type: String,
        default: "-"
    },
    category1: {
        type: String,
        default: "-"
    },
    category2: {
        type: String,
        default: "-"
    },
    itemType: {
        type: String,
        enum: ["Rent", "Sell"],
        required: true
    },
    dailyRental: {
        type: Number,
        default: 0
    },
    weeklyRental: {
        type: Number,
        default: 0
    },
    monthlyRental: {
        type: Number,
        default: 0
    },
    deposit: {
        type: Number,
        default: 0
    }    
}, { timestamps: true });

module.exports = mongoose.model('medserv_products', ProductSchema);
