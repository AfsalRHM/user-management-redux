import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server Running on : http://localhost:3000");
});
