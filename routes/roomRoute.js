const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel.js");

// Create a new room
router.post("/createRoom", async (req, res) => {
  try {
    const { roomNumber, roomType, pricePerHour } = req.body;
    const newRoom = new Room({
      roomNumber,
      roomType,
      pricePerHour,
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getRooms", async (req, res) => {
  try {
    const rooms = await find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms." });
  }
});

// Add more routes for updating, deleting, and filtering rooms
// ...
module.exports = router;
