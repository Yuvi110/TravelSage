const express = require("express")
const dotenv  = require("dotenv");
const mongoose = require( "mongoose");
const cookieParser = require("cookie-parser");
const roomRoute = require( "./routes/roomRoute.js");
const bookingRoute = require("./routes/bookingRoute.js");
const cors = require("cors");
const morgan = require( "morgan");
const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Method",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("diconeected", () => {
  console.log("mongoDB disconnected");
});
app.use(cookieParser());
app.use(express.json());

app.use("/rooms", roomRoute);
app.use("/hotel", bookingRoute);

const port = 5000;
app.listen(port, () => {
  connect();
  console.log(`server running on ${port}`);
});
