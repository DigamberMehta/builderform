import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"; // Import mongoose

dotenv.config({});

const app = express();

// Default middlewares
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://builderform-ten.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Handle preflight (OPTIONS) requests for all routes
app.options("*", cors());


app.use(cookieParser());

// Define Mongoose Schema and Model for Builder Applications
const builderSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 70 },
  experience_years: { type: Number, required: true, min: 0, max: 50 },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: String,
  english_level: {
    type: String,
    enum: ['none', 'can_understand_a_bit', 'can_understand_most', 'can_understand_most_and_speak', 'fluent'],
    default: 'none'
  },
  alcohol: {
    type: String,
    enum: ['none', 'yes_but_not_during_work', 'yes_and_also_during_work', 'i_have_a_drinking_problem_and_it_could_affect_my_work'],
    default: 'none'
  },
  london_available_from: { type: Date, required: true },
  london_available_to: { type: Date, required: true },
  skills: {
    bricklaying: { type: Number, min: 0, max: 9, default: 0 },
    plastering: { type: Number, min: 0, max: 9, default: 0 },
    plumbing: { type: Number, min: 0, max: 9, default: 0 },
    electrician: { type: Number, min: 0, max: 9, default: 0 },
    roofing: { type: Number, min: 0, max: 9, default: 0 },
    painting: { type: Number, min: 0, max: 9, default: 0 },
    tiling: { type: Number, min: 0, max: 9, default: 0 },
    flooring: { type: Number, min: 0, max: 9, default: 0 },
    carpentry: { type: Number, min: 0, max: 9, default: 0 },
    build_kitchen: { type: Number, min: 0, max: 9, default: 0 },
    build_extension: { type: Number, min: 0, max: 9, default: 0 },
    lay_foundations: { type: Number, min: 0, max: 9, default: 0 },
    labour: { type: Number, min: 0, max: 9, default: 0 },
  },
  salary: { type: Number, required: true, min: 0 },
  comments: { type: String, required: true },
  submission_date: { type: Date, default: Date.now }
}, { timestamps: true }); // Add timestamps for creation and update dates

const Builder = mongoose.model('Builder', builderSchema);

// APIs
app.use("/api/v1/user", userRoutes);

// Form submission API route
app.post('/api/submit-builder-form', async (req, res) => {
  try {
    const newBuilder = new Builder(req.body);
    await newBuilder.save();
    res.status(201).json({ message: 'Builder application submitted successfully!', builder: newBuilder });
  } catch (err) {
    console.error('Error saving builder application:', err);
    if (err.code === 11000) { // Duplicate key error (e.g., email unique constraint)
      res.status(409).json({ message: 'An application with this email already exists.' });
    } else if (err.name === 'ValidationError') { // Mongoose validation error
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      res.status(400).json({ message: 'Validation failed', errors });
    } else {
      res.status(500).json({ message: 'Error processing your application.', error: err.message });
    }
  }
});

// call the connectDB function
connectDB();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});