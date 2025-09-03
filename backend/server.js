const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URL; // Make sure your .env has DB_URL=...

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",                   // local development
  "https://to-do-list-app-nu-weld.vercel.app" // deployed frontend
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
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

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
  });
});
