const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel.js");
const Booking = require("../models/bookingModel.js");
var SibApiV3Sdk = require("sib-api-v3-sdk");

function sendEmail(email, htmlContent, subject) {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO;

  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
  const sender = {
    email: "bhadauriayuvraj1110@gmail.com",
    name: "TravelSage",
  };

  const receivers = [
    {
      email: email,
    },
  ];
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      htmlContent: htmlContent,
    })
    .then(console.log)
    .catch(console.log);
}

//GET ALL BOOKINGS
// Get all bookings with filters
router.get("/bookings", async (req, res) => {
  try {
    const { filtertype, value } = req.query;

    const filters = {};

    if (filtertype === "Room Number") {
      filters.roomNumber = value;
    }

    if (filtertype === "Room Type") {
      filters.roomType = value;
    }

    if (filtertype === "Start time") {
      filters.startTime = new Date(value);
    }

    const bookings = await Booking.find(filters);
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to fetch bookings" });
  }
});

//Get Single Booking
router.get("/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the booking." });
  }
});

router.get("/upcomingBookings", async (req, res) => {
  try {
    const curTime = new Date();
    const booking = await Booking.find({ startTime: { $gte: curTime } }, null, {
      limit: 3,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch the booking." });
  }
});

// Create a new booking
router.post("/bookRoom", async (req, res) => {
  try {
    const { userEmail, roomNumber, startTime, endTime } = req.body;
    const start = new Date(req.body.startTime);
    const end = new Date(req.body.endTime);

    const isRoomAvailable = await checkRoomAvailability(
      roomNumber,
      startTime,
      endTime
    );

    if (!isRoomAvailable) {
      res.status(200).send({
        success: false,
        message: "The Room is not available for the given slot",
      });
      return;
    }

    // Calculate the total price based on room type and duration
    const room = await Room.findOne({ roomNumber });
    const pricePerHour = room.pricePerHour;
    const totalHours = (end - start) / (1000 * 60 * 60);
    const totalPrice = Math.ceil((pricePerHour * totalHours) / 10) * 10;

    const roomType = room.roomType;
    const newBooking = new Booking({
      userEmail,
      roomNumber,
      startTime,
      endTime,
      totalPrice,
      roomType,
    });
    await newBooking.save();
    let htmlContent = `Hello ${userEmail} Your booking details are as follows:
    Room Numer: ${roomNumber}`;
    sendEmail(userEmail, htmlContent, "Booking Confirmation");
    res
      .status(201)
      .send({ success: true, message: "Room Booked Successfully" });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Function to check room availability
async function checkRoomAvailability(roomNumber, startTime, endTime) {
  const existingBookings = await Booking.find({ roomNumber });
  for (const booking of existingBookings) {
    let st = new Date(startTime);
    let et = new Date(endTime);
    if (
      (et <= booking.endTime && et >= booking.startTime) ||
      (st <= booking.endTime && st >= booking.startTime)
    ) {
      return false; // Room is already booked for some or all of the specified time
    }
  }
  return true; // Room is available
}

//EDIT BOOKING

// Edit an existing booking
router.put("/bookings/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { userEmail, roomNumber, startTime, endTime } = req.body;
    const start = new Date(req.body.startTime);
    const end = new Date(req.body.endTime);

    const existingBookings = await Booking.findById(bookingId);

    //Billing
    const room = await Room.findOne({ roomNumber });
    const pricePerHour = room.pricePerHour;
    const totalHours = (end - start) / (1000 * 60 * 60);
    const totalPrice = pricePerHour * totalHours;

    //constraints

    if (roomNumber !== existingBookings.roomNumber) {
      const isRoomAvailable = await checkRoomAvailability(
        roomNumber,
        startTime,
        endTime
      );
      if (!isRoomAvailable) {
        return res
          .status(400)
          .json({ error: "The room is not available for the specified time." });
      }
    }
    await Booking.findByIdAndUpdate(bookingId, {
      userEmail: userEmail,
      roomNumber: roomNumber,
      startTime: startTime,
      endTime: endTime,
      totalPrice: totalPrice,
    });
    res.status(200).send("Done");
  } catch (error) {
    console.log(error);
  }
});

//DELETE BOOKING

router.get("/getRefundDetails/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, error: "Booking not found." });
    }

    const currentTime = new Date();
    const timeUntilStart = booking.startTime - currentTime;
    const hoursUntilStart = timeUntilStart / (1000 * 60 * 60);

    let refund = 0;
    if (hoursUntilStart > 48) {
      refund = booking.totalPrice;
    } else if (hoursUntilStart >= 24) {
      refund = booking.totalPrice / 2;
    }

    // Perform the refund operation or cancellation as needed
    // ...

    // Delete the booking from the database
    res.status(200).json({
      success: true,
      message: "Refund Caluclated",
      refund,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to calculate refund." });
  }
});

// Cancel an existing booking with refund conditions
router.delete("/bookings/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, error: "Booking not found." });
    }

    const currentTime = new Date();
    const timeUntilStart = booking.startTime - currentTime;
    const hoursUntilStart = timeUntilStart / (1000 * 60 * 60);

    let refund = 0;
    if (hoursUntilStart > 48) {
      refund = booking.totalPrice;
    } else if (hoursUntilStart >= 24) {
      refund = booking.totalPrice / 2;
    }

    // Perform the refund operation or cancellation as needed
    // ...

    // Delete the booking from the database
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      refund,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to cancel the booking." });
  }
});
module.exports = router;
