const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();


// Sign-up route
// auth.js

// Utility functions for validation
const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

const validateMobileNumber = (mobile) => {
  // Validate mobile number for 10 digits
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

const validatePassword = (password) => {
  // Validate password: at least 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

const allowedCities = ["Colombo", "Kandy", "Jaffna", "Galle"]; // List of allowed cities

// Sign-up route
router.post('/signup', async (req, res) => {
  console.log("Payload received:", req.body); // Debugging

  const { firstName, lastName, email, mobile, address, city, password, confirmPassword } = req.body;


  // Validate all fields
  if (!firstName || !lastName || !email || !mobile || !address || !city || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!validateMobileNumber(mobile)) {
    return res.status(400).json({ message: "Invalid mobile number format. It should be 10 digits" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long and contain letters and numbers" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!allowedCities.includes(city)) {
    return res.status(400).json({ message: "Invalid city selection" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile, 
      address,
      city,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found, Please use the email that you have registered with MedServe or You can now register with MedServe using your email" });

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials, Check your Email and Password are Correct" });
    }

    // Generate token
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Log the response here before sending
    console.log('Login successful:', { result: user, token });

    // Send success response
    res.status(200).json({ result: user, token });
  } catch (error) {
    console.error("Sign-in error:", error);  // Log the error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
});







// Forgot password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      html: `<p>Click <a href="http://localhost:5173/reset-password/${resetToken}">here</a> to reset your password</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgot-password route:", error); // Added this line for check.
    res.status(500).json({ message: "Something went wrong" });
  }
});





// Password validation function
const passwordValidator = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

// Reset password route (GET)
router.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.resetToken !== token || user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Token is valid, send response for frontend to let the user input new password
    res.status(200).json({ message: "Token is valid. Please enter your new password." });
  } catch (error) {
    console.error("Error verifying reset token:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Reset password route (POST)
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Validate the new password
  if (!passwordValidator(newPassword)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long and contain letters and numbers." });
  }

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.resetToken !== token || user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear reset token after successful password reset
    user.resetTokenExpiration = undefined; // Clear reset token expiration
    await user.save();

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;
