const express = require("express");
const router = express.Router();
const multer = require("multer");
const Prescription = require("../models/Prescription");

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();

const prescritionUploads = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// POST route for prescription upload
router.post("/", prescritionUploads.single("prescriptionFile"), async (req, res) => {
    try {
        // Ensure the file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "File upload is required" });
        }

        // Validate the required fields
        const { patientName, patientAge, patientGender, frequency, fulfillment, substitutes, message } = req.body;

        // Check for missing fields
        if (!patientName || !patientAge || !patientGender || !frequency || !fulfillment || !substitutes) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate patient age
        if (patientAge <= 0) {
            return res.status(400).json({ error: "Patient age must be a positive number." });
        }

        // Save prescription details in the database
        const prescription = new Prescription({
            patientName,
            patientAge,
            patientGender,
            frequency,
            fulfillment,
            substitutes,
            // prescriptionFile: req.file.path, // File path where the file is stored
            prescriptionFile: {
                data: req.file.buffer, // Binary file data from Multer
                contentType: req.file.mimetype, // File MIME type
            },
            message,
        });

        await prescription.save();

        return res.status(201).json({
            message: "Prescription saved successfully",
            prescription,
        });
    } catch (error) {
        console.error("Error saving prescription:", error.message);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id);

        // Check if the prescription exists
        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found." });
        }

        // Validate the presence of file data
        if (!prescription.prescriptionFile || !prescription.prescriptionFile.data) {
            return res.status(404).json({ error: "File data not available." });
        }

        // Send the file as a response
        res.contentType(prescription.prescriptionFile.contentType);
        res.send(prescription.prescriptionFile.data);
    } catch (error) {
        console.error("Error fetching prescription:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Error handling middleware for multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Multer error: " + err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    } else {
        next();
    }
});

module.exports = router;


