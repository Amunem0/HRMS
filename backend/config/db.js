const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Optionally, set strictQuery mode:
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
