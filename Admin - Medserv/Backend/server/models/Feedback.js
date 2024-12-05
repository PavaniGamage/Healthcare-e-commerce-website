const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: "-"
    },
    message: {
        type: String,
        default: "-"
    }
}, { timestamps: true });

module.exports = mongoose.model('medserv_feedbacks', FeedbackSchema);
