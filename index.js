import express from "express";
import { config } from "dotenv";
import connectDB from "./DB/connect_db.js";
import colors from "colors";

import startCryptoJob from "./jobs/cryptojob.js";
import { getStats, getDeviation } from "./controllers/cryptoController.js";

// Config dotenv
config({ path: "./config/config.env" });

const app = express();
const router = express.Router();
const PORT = process.env.PORT;


// Connect to DB
connectDB();

// Middleware
app.use("/", router);
app.use(express.json());

// API
router.get("/stats", getStats);
router.get("/deviation", getDeviation);

// Start the background job
startCryptoJob();

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`.green.bold);
});
