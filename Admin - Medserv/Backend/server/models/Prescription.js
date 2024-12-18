const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;
const PrescriptionSchema = new Schema({
    userEmail: { 
        type: String, 
        required: true 
    },
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: String,
        required: true
    },
    patientGender: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    fulfillment: {
        type: String,
        required: true
    },
    substitutes: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: "-"
    },
    prescriptionFile: {
        data: Buffer,
        contentType: String
    },
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
    }
}, { timestamps: true });

module.exports = mongoose.model('medserv_prescriptions', PrescriptionSchema);
