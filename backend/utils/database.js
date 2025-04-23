
import mongoose from 'mongoose';

const databaseConnection = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
    });
};

export default databaseConnection;
