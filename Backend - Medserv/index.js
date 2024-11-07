const port = 4000; // express server running port

// import dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Create the upload directory if it doesn't exist
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(cors()); // Consider configuring specific origins in production

// load enviranment variable
require("dotenv").config(); // Load .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection error: " + error));

// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// // Image storage engine
// const storage = multer.diskStorage({
//     destination: uploadDir, // where the images will be stored
//     filename: (req, file, cb) => {
//         // Set the filename with fieldname and timestamp
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ 
//     storage: storage
//     // limits: { fileSize: 1024 * 1024 * 5 } // 5 MB limit
// });

// // Create uploading endpoints for images
// app.use('/images', express.static(uploadDir));

// app.post("/upload", upload.single('product'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ success: 0, message: "No file uploaded" });
//     }
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`
//     });
// });

// Schema for Creating Products
const Product = mongoose.model("Product", {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ["Available", "Not Available"],
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
    },
    createdAt: {
        type: Date,
        // required: true
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        // required: true
        default: Date.now()
    }
}, "medserv_products"); // the collection name

// // getting all products
// app.get('/allproducts', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         console.log("All Products Fetched");
//         res.status(200).send(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).send("Error fetching products");
//     }
// });

// create endpoint for products, send to frontend
app.get('/formattedProducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("Fetched Products:", products); // Log the fetched products

        if (products.length === 0) {
            return res.status(404).send("No products found");
        }

        const formattedProducts = products.map(product => ({
            itemId: product._id,
            itemType: product.itemType,
            name: product.name,
            price: product.price.toFixed(2),
            availability: product.availability,
            description: product.description,
            subDescription: product.subDescription, 
            imageSource: product.imageSource,
            imageUrl: product.imageUrl,
            categoryMain: product.category1,
            categorySub: product.category2,
            keywords: product.keywords,
            rating: product.rating,
            daillyRental: product.dailyRental.toFixed(2),
            weeklyRental: product.weeklyRental.toFixed(2),
            monthlyRental: product.monthlyRental.toFixed(2),
            deposit: product.deposit.toFixed(2)
        }));

        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error("Error fetching formatted products:", error);
        res.status(500).send("Error fetching formatted products");
    }
});

// Starting the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
