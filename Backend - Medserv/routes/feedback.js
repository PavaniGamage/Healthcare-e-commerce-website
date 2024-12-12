const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST route for feedback
router.post("/", async (req, res) => {
    try {
      const newFeedback = new Feedback({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      });
  
      await newFeedback.save();
      console.log("Feedback saved successfully:", newFeedback);
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error("Error saving feedback:", error);
      res.status(500).json({ message: 'Failed to save feedback' });
    }
});
  
module.exports = router;
