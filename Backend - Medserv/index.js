// for writing all the backend codes

const port = 4000; // express server running port

// import dependancies and modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// database connection with MongoDM
mongoose.connect("mongodb+srv://Medserv_User:<MedserV2024>@cluster0.3olp0.mongodb.net/")

// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images', // where the images will be stored
    filename: (req, file, cb) => {
        // Set the filename with fieldname and timestamp
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});


const upload = multer({ storage: storage });

// Create uploading endpoints for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

