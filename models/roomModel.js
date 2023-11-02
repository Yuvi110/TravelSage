const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Room", roomSchema);
