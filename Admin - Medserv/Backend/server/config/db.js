const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI_DB_MEDSERV); // the environment variable
        console.log(`Database Connected: ${conn.connection.host}`); // console.log
    } catch (error) {
        console.error(error); 
    }
};

module.exports = connectDB;  
