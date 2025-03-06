const express = require("express");
const router = express.Router();
const multer = require("multer");
const Donation = require("../models/Donation");
const Counter = require("../models/DonationCounts");

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();

const donationUploads = multer({
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

// POST route for donation upload
router.post("/", donationUploads.fields([
    { name: 'proofOfIncome', maxCount: 1 },
    { name: 'proofOfResidence', maxCount: 1 },
    { name: 'medicalCondition', maxCount: 1 },
    { name: 'prescriptionDocument', maxCount: 1 }
]), async (req, res) => {
    try {
        // Debugging - Log request data
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { fullName, gender, dateOfBirth, contactNumber, email, residentialAddress, numberOfFamilyMembers, financialSituation } = req.body;

        if (!fullName || !gender || !dateOfBirth || !contactNumber || !email || !residentialAddress || !numberOfFamilyMembers || !financialSituation) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if files are present
        if (!req.files || !req.files.proofOfIncome || !req.files.proofOfResidence || !req.files.medicalCondition || !req.files.prescriptionDocument) {
            return res.status(400).json({ error: "All required documents must be uploaded." });
        }

        // Generate donationID atomically
        const donationCounter = await Counter.findOneAndUpdate(
            { name: "donationID" }, // Find by name
            { $inc: { value: 1 } }, // Increment value by 1
            { 
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true // Set the default if the document doesn't exist
            }
        );

        if (!donationCounter) {
            return res.status(500).json({ error: "Failed to generate donation ID." });
        }

        // The value should be a number
        const donationID = donationCounter.value;

        console.log("Generated Donation ID:", donationID);

        const status = 'Pending';

        const donation = new Donation({
            donationID,
            fullName,
            gender,
            dateOfBirth,
            contactNumber,
            email,
            residentialAddress,
            numberOfFamilyMembers,
            financialSituation,
            supportingDocuments: {
                proofOfIncome: {
                    data: req.files.proofOfIncome[0].buffer,
                    contentType: req.files.proofOfIncome[0].mimetype,
                },
                proofOfResidence: {
                    data: req.files.proofOfResidence[0].buffer,
                    contentType: req.files.proofOfResidence[0].mimetype,
                },
                medicalCondition: {
                    data: req.files.medicalCondition[0].buffer,
                    contentType: req.files.medicalCondition[0].mimetype,
                },
                prescriptionDocument: {
                    data: req.files.prescriptionDocument[0].buffer,
                    contentType: req.files.prescriptionDocument[0].mimetype,
                },
            },
            status,
            review: {
                reviewStatus: null,
                reviewFeedback: null,
                reviewTime: null, 
            },
            billDetails: {
                billFile: {
                    data: null,
                    contentType: null, 
                },
                totalPrice: null, 
                Other: null, 
                billDate: null, 
            },
            sessionId: null,
            paymentDetails: {
                userEmail: null,
                userName: null,
                userPhone: null,
                donationAmount: null,
                status: null,
                message: null,
                paymentMethod: null,
                donationDate: null,
                billInvoiceID: null,
                createdAt: null,
            },
        });

        await donation.save();

        return res.status(201).json({
            message: "Donation request saved successfully.",
            donation,
        });
    } catch (error) {
        console.error("Error saving donation request:", error.message);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

// Get all donations
router.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find();

        const formattedDonations = donations.map(({ _doc, supportingDocuments, billDetails }) => ({
            ..._doc,
            supportingDocuments: Object.fromEntries(
                Object.entries(supportingDocuments || {}).map(([key, doc]) => [
                    key, doc?.data ? { data: doc.data.toString('base64'), contentType: doc.contentType } : null
                ])
            ),
            billDetails: billDetails ? {
                ...billDetails,
                billFile: billDetails.billFile?.data
                    ? { data: billDetails.billFile.data.toString('base64'), contentType: billDetails.billFile.contentType }
                    : null
            } : {}
        }));

        res.status(200).json(formattedDonations);
    } catch (error) {
        console.error('Error fetching donations:', error);  // Add logging for debugging
        res.status(500).json({ message: 'Error fetching donations', error });
    }
});

// Get a single donation by ID
router.get('/donations/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ message: 'Donation not found' });
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donation', error });
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
