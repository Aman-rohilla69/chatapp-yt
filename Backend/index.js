import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/user.route.js";
import messageRoute from "./Routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
configDotenv();

const port = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// -------------Middlewares:-------------

app.use(express.json());
app.use(cookieParser());
// app.use(cors());

// ------------- Routes:----------------

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ------------------- Database connection code---------------------

if (!URI) {
  console.log("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

const DB_connection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.log("✅ Connected to MongoDB!", URI);

    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

DB_connection().then(() => {
  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
