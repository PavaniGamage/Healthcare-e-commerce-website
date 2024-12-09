const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Salt rounds for bcrypt
const passwordAdmin = process.env.passwordAdmin;
const passwordPharmacist = process.env.passwordPharmacist;

const Schema = mongoose.Schema;

// Define the Account schema
const AccountSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['admin', 'pharmacist'],
        default: 'admin',
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Hash the password before saving the user
AccountSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // If password isn't modified, skip hashing
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords (used during login)
AccountSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
module.exports = mongoose.model('medserv_accounts', AccountSchema);