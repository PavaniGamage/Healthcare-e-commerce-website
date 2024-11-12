const mongoose = require("mongoose");

// db connection
const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
        console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (error) => {
        console.log("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
    });
};

module.exports = dbConnect;