import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/user.route.js";
import messageRoute from "./Routes/message.route.js";
import cors from "cors";
import path from "path";
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

//--------------------Code for Deployment---------------------
// if(process.env.NODE_ENV === "production"){
// const dirPath = path.resolve();
//   app.use(express.static("./Frontend/dist"));

  if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();

  app.use(express.static(path.join(dirPath, "Frontend/dist")));

  // ✅ Catch-all handler
  app.use((req, res) => {
    res.sendFile(path.join(dirPath, "Frontend/dist", "index.html"));
  });
}
  // app.get("/*", (req, res) => { 
  //   res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
  // });

// }
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
