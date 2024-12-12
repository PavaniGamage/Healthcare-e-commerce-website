const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientGender: { type: String, required: true },
    frequency: { type: String, required: true },
    fulfillment: { type: String, required: true },
    substitutes: { type: String, required: true },
    // prescriptionFile: { type: String, required: true },
    prescriptionFile: { 
        data: { type: Buffer, required: true }, // Binary data for file
        contentType: { type: String, required: true }, // MIME type (e.g., "image/png", "application/pdf")
    }, 
    message: { type: String, required: false },
}, { timestamps: true });

const Prescription = mongoose.model("Medserv_Prescriptions", prescriptionSchema);

module.exports = Prescription;
