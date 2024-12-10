// express server running port
const port = process.env.PORT || 4000; 

// load enviranment variable
require("dotenv").config(); // Load .env file

// import dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");    
const Product = require("./models/Product");         
const productRoutes = require("./routes/products");
const feedbackRoutes = require("./routes/feedback");
const prescriptionRoutes = require("./routes/prescription");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow specific frontend URL to access backend
// app.use(cors());
app.use(cors({
    // origin: 'http://localhost:5173',                                      // Allow only the frontend's URL to access the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                               // 'GET', 'POST', 'PUT', 'DELETE' - Only GET
    credentials: true                                                        // Allow cookies and credentials if necessary
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

const GridFsStorage = require("multer-gridfs-storage");                      // store images/fles in MongoDB

// Debugging and REPL utilities
const { start } = require("repl");                                           // Used for interactive JavaScript evaluation

// Create the upload directory if it doesn't exist
// const uploadDir = './upload/images';
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// API creation root path
app.get("/", (req, res) => {
    res.send("Hello, MongoDB!, Express App is Running");
});

// for getting products and other details
app.use("/formattedProducts", productRoutes);
app.use("/feedback", feedbackRoutes);

// app.use('/upload/prescriptions', express.static(path.join(__dirname, 'uploads')));
app.use("/prescriptionsUpload", prescriptionRoutes);

// Starting the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});

// // ----------------------------------------------------------------------------------------------
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
