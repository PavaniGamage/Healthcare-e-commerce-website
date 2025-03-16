const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;
const DonationSchema = new Schema({
    donationID: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: Number, required: true },
    email: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    numberOfFamilyMembers: { type: Number, required: true },
    financialSituation: { type: String, required: true },
    supportingDocuments: { 
        proofOfIncome: { 
            data: { type: Buffer, required: true }, 
            contentType: { type: String, required: true }, 
        },
        proofOfResidence: { 
            data: { type: Buffer, required: true }, 
            contentType: { type: String, required: true }, 
        },
        medicalCondition: { 
            data: { type: Buffer, required: true }, 
            contentType: { type: String, required: true }, 
        },
        prescriptionDocument: { 
            data: { type: Buffer, required: true }, 
            contentType: { type: String, required: true }, 
        },
    },
    status: { type: String, required: true },
    review: {
        reviewStatus: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'], 
            default: 'Pending'
        },
        reviewFeedback: {
            type: String,
            default: '-'
        },
        reviewTime: {
            type: Date
        }
    },
    billDetails: {
        billFile: {
            data: Buffer,
            contentType: String 
        },
        totalPrice: {
            type: Number, 
            min: 0
        },
        Other: {
            type: String
        },
        billDate: {
            type: Date
        }
    },
    sendingStatus: { type: String },
    sessionId: { type: String },
    paymentDetails: {
        userEmail: { type: String },
        userName: { type: String },
        userPhone: { type: String },
        donationAmount: { type: Number },
        status: { type: String },
        message: { type: String },
        paymentMethod: { type: String },
        donationDate: { type: Date },
        billInvoiceID: { type: Number },
        createdAt: { type: Date },
    },
}, { timestamps: true });

module.exports = mongoose.model('Medserv_Donation_Requests', DonationSchema);
