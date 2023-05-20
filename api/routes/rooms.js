import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/:hotelId", verifyAdmin, createRoom);

// update
router.put("/:id", verifyAdmin, updateRoom);

// Delete
router.delete("/:id", verifyAdmin, deleteRoom);

// get single hotel
router.get("/find/:id", getRoom);

// get all
router.get("/", getRooms);

router.put("/availability/:id", updateRoomAvailability);

export default router;
