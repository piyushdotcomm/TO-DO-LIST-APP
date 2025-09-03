const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ToDo = require('./models/ToDoList'); // adjust the path if needed

dotenv.config();

const MONGO_URI = process.env.DB_URL; // make sure DB_URL exists in .env

const connectAndInsert = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    // Sample data
    const sampleTodos = [
      {
        title: "Finish React Project",
        description: "Complete by tonight",
        isCompleted: false,
        createdBy: "64d1f3a9f0a7c2d123456789", // replace with a valid User ObjectId
      },
    ];

    const result = await ToDo.insertMany(sampleTodos);
    console.log("📌 Inserted Sample Todos:", result);

    mongoose.connection.close();
    console.log("🔒 Connection Closed");
  } catch (err) {
    console.error("❌ Error inserting sample data:", err.message);
    mongoose.connection.close();
  }
};

connectAndInsert();
