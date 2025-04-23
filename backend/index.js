import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './utils/database.js'; 
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Connect to DB
databaseConnection();

// Setup CORS **before** your routes
const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true, 
};
app.use(cors(corsOption));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is listening at port ${process.env.PORT}`);
});
