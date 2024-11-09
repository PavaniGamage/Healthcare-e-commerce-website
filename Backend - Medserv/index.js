// express server running port
const port = process.env.PORT || 4000; 

// load enviranment variable
require("dotenv").config(); // Load .env file

// import dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");             
// const productRoutes = require("./routes/products");
const cors = require("cors");
const app = express();

app.use(express.json());

// Allow specific frontend URL to access backend
// app.use(cors());
app.use(cors({
    // origin: 'http://localhost:5173',                                       // Allow only the frontend's URL to access the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                                                      // 'GET', 'POST', 'PUT', 'DELETE' - Only GET
    credentials: true                                                      // Allow cookies and credentials if necessary
}));

// Call the connection function immediately
dbConnect();

// other dependencies
// Authentication and security dependencies 
const jwt = require("jsonwebtoken");                                         // Handles JWT for authentication.

// File handling and storage dependencies
const multer = require("multer");                                            // Handles file uploads.
const path = require("path");                                                // Manipulates file paths.
const fs = require("fs");                                                    // Works with the file system.

// Debugging and REPL utilities
const { start } = require("repl");                                           // Used for interactive JavaScript evaluation

// Create the upload directory if it doesn't exist
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// API creation root path
app.get("/", (req, res) => {
    res.send("Hello, MongoDB!, Express App is Running");
});













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


// ----------------------------------------------------------

// express server running port
// const port = process.env.PORT || 4000; 

// // load enviranment variable
// require("dotenv").config(); // Load .env file

// // import dependencies and modules
// const express = require("express");
// const dbConnect = require("./dbConnect");             
// const productRoutes = require("./routes/products");
// const cors = require("cors");
// const app = express();

// app.use(express.json());

// // Allow specific frontend URL to access backend
// app.use(cors());
// // app.use(cors({
// //     origin: 'http://localhost:5173',                                       // Allow only the frontend's URL to access the backend
// //     methods: ['GET'],                                                      // 'GET', 'POST', 'PUT', 'DELETE' - Only GET
// //     credentials: true                                                      // Allow cookies and credentials if necessary
// // }));

// // Call the connection function immediately
// dbConnect();

// // other dependencies
// // Authentication and security dependencies 
// const jwt = require("jsonwebtoken");                                         // Handles JWT for authentication.

// // File handling and storage dependencies
// const multer = require("multer");                                            // Handles file uploads.
// const path = require("path");                                                // Manipulates file paths.
// const fs = require("fs");                                                    // Works with the file system.

// // Debugging and REPL utilities
// const { start } = require("repl");                                           // Used for interactive JavaScript evaluation

// // Create the upload directory if it doesn't exist
// const uploadDir = './upload/images';
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // API creation root path
// app.get("/", (req, res) => {
//     res.send("Hello, MongoDB!, Express App is Running");
// });

// // for getting products
// app.use("/formattedProducts", productRoutes);

// // Starting the server
// app.listen(port, (error) => {
//     if (error) {
//         console.error("Error starting server:", error);
//     } else {
//         console.log(`Server running on port ${port}`);
//     }
// });


// // -----for file handling---------------------------------------------------------------

// // // Image storage engine
// // const storage = multer.diskStorage({
// //     destination: uploadDir, // where the images will be stored
// //     filename: (req, file, cb) => {
// //         // Set the filename with fieldname and timestamp
// //         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
// //     }
// // });

// // const upload = multer({ 
// //     storage: storage
// //     // limits: { fileSize: 1024 * 1024 * 5 } // 5 MB limit
// // });

// // // Create uploading endpoints for images
// // app.use('/images', express.static(uploadDir));

// // app.post("/upload", upload.single('product'), (req, res) => {
// //     if (!req.file) {
// //         return res.status(400).json({ success: 0, message: "No file uploaded" });
// //     }
// //     res.json({
// //         success: 1,
// //         image_url: `http://localhost:${port}/images/${req.file.filename}`
// //     });
// // });
