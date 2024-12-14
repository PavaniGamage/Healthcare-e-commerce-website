const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  address: String,
  city: String,
  password: String,
  resetToken: String,           // Token for password reset
  resetTokenExpiration: Date,   // Expiration for reset token
});

module.exports = mongoose.model("User", userSchema);
