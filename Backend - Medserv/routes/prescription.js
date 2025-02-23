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
        const { userEmail, patientName, patientAge, patientGender, frequency, fulfillment, substitutes, message } = req.body;

        // Check for missing fields
        if (!userEmail || !patientName || !patientAge || !patientGender || !frequency || !fulfillment || !substitutes) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate patient age
        if (patientAge <= 0) {
            return res.status(400).json({ error: "Patient age must be a positive number." });
        }

        // Fetch the last orderID and increment
        const getNextOrderID = async () => {
            const lastOrder = await Prescription.findOne().sort({ orderID: -1 }).limit(1);
            return lastOrder ? lastOrder.orderID + 1 : 1;
        };

        // Generate the orderID
        const orderID = await getNextOrderID();

        // set the status
        const status = 'Pending';

        // Save prescription details in the database
        const prescription = new Prescription({
            userEmail,
            orderID,
            patientName,
            patientAge,
            patientGender,
            frequency,
            fulfillment,
            substitutes,
            prescriptionFile: {
                data: req.file.buffer, // Binary file data from Multer
                contentType: req.file.mimetype, // File MIME type
            },
            message,
            status,
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

// Get Prescription Data from DB
router.get('/prescription_history/:email', async (req, res) => { 
    try {
      const userEmail = req.params.email; 
      const prescriptionOrders = await Prescription.find({ userEmail });
      
      if (prescriptionOrders.length === 0) { 
        return res.status(404).json({ message: 'No prescription orders found for this email' });
      }
      
      res.status(200).json(prescriptionOrders); 
    } catch (error) {
      console.error('Error fetching prescription orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching prescription orders' });
    }
});

// GET route for fetching order details by orderID and userEmail
router.get('/prescription_history/:email/:orderID', async (req, res) => {
    const userEmail = req.params.email; 
    const orderID = req.params.orderID; 

    try {      
      const upload = await Prescription.findOne({ userEmail: userEmail, orderID: orderID });

      if (!upload) {
        return res.status(404).json({ message: 'Upload not found.' });
      }

      if (!upload.billDetails) {
        // If billDetails is missing, set default values
        upload.billDetails = {
          billFile: { data: null, contentType: 'null' },
          totalPrice: '0',
          other: '-'
        };
      }

      const prescriptionFileBase64 = upload.prescriptionFile
        ? upload.prescriptionFile.data.toString('base64')
        : null;

      const billFileBase64 = upload.billDetails.billFile
      ? upload.billDetails.billFile.data.toString('base64')
      : null;

      res.status(200).json({
        orderID: upload.orderID,
        patientName: upload.patientName,
        patientAge: upload.patientAge,
        patientGender: upload.patientGender,
        frequency: upload.frequency,
        fulfillment: upload.fulfillment,
        substitutes: upload.substitutes,
        status: upload.status,
        message: upload.message,
        prescriptionFile: {
            data: prescriptionFileBase64,  // Base64 encoded string
            contentType: upload.prescriptionFile.contentType, // Content type like "image/jpeg"
        },
        billDetails: {
            billFile: {
                data: billFileBase64 || '',  // Base64 encoded string
                contentType: upload.billDetails.billFile.contentType || '', // Content type like "image/jpeg"
            },
            totalPrice: upload.billDetails.totalPrice || '',
            otherInBill: upload.billDetails.Other || '',
        }
      }); 
    } catch (error) {
      console.error('Error fetching the upload:', error);
      res.status(500).json({ error: 'An error occurred while fetching the upload.' });
    }
});

module.exports = router; 


