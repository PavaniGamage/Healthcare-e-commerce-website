const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    orderID: { type: Number, required: true, unique: true },
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
    status: { type: String },
    billDetails: {
        billFile: {
            data: { type: Buffer, default: Buffer.from('') }, 
            contentType: { type: String, default: '-' } 
        },
        totalPrice: { type: Number, min: 0, default: null },
        Other: { type: String, default: '-' },
        billDate: { type: Date, default: null }
    },
    paymentDetails: {
        name: { type: String },
        email: { type: String },
        phone: {type: Number },
        paymentAmount: { type: Number },
        paymentMethod: { type: String },
        paymentDate: { type: Date },
        sessionId: { type: String },
        billInvoiceID: { type: Number, index: true },
    }
}, { timestamps: true });

const Prescription = mongoose.model("Medserv_Prescriptions", prescriptionSchema);

module.exports = Prescription;
