const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors"); // Only declare cors once
require("dotenv").config();

const app = express();

// CORS configuration to allow frontend communication from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin (adjust if needed)
  credentials: true, // Allow cookies or authentication headers
}));

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// MongoDB connection
connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// Import and register routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes); // Prefix all auth routes with /api/auth

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const path = require("path");

// Serve React static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}
