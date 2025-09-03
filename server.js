const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/toDoRoutes');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URL;  // 👈 make sure your .env has DB_URL=...

// Middleware
app.use(cors({
  origin: "http://localhost:3000",  // allow only frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); // Stop the server if DB fails
  }
};

// Start Server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
  });
});
