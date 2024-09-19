import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Conneted to Database");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server Running on : http://localhost:3000");
});
