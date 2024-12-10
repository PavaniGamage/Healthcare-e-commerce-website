const mongoose = require("mongoose");

const dbConnect = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MongoDB URI is not defined in environment variables.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database successfully");

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = dbConnect;
