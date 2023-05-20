import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cors from "cors";

// database connect
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connection Successful...");
  })
  .catch((error) => {
    console.log(`DB Error: ${error}`);
  });

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// middle wares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// middleware for error occurs in route
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`Running on port no. ${port}`);
});
