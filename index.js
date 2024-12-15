import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import connectDB from "./config/database.config.js";

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
