import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js"

import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Conneted to Database");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server Running on : http://localhost:3000");
});
