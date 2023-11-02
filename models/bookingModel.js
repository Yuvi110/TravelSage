const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bookingSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
