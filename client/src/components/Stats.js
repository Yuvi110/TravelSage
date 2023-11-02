import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { Link } from "react-router-dom";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function calculateTotalPriceOnDate(bookings, date) {
  const totalPriceOnDate = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.startTime);
      return (
        bookingDate.getUTCFullYear() === date.getUTCFullYear() &&
        bookingDate.getUTCMonth() === date.getUTCMonth() &&
        bookingDate.getUTCDate() === date.getUTCDate()
      );
    })
    .reduce((total, booking) => total + booking.totalPrice, 0);

  return totalPriceOnDate;
}
const Stats = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [totalPriceOnDate, setTotalPriceOnDate] = useState(0);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Make an HTTP request to fetch upcoming bookings
    axios
      .get("http://localhost:5000/hotel/upcomingBookings") // Replace with the actual API endpoint
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming bookings:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/hotel/bookings")
      .then((response) => {
        const data = response.data;
        const formattedData = data.map((item) => ({
          x: new Date(item.startTime), // Assuming 'startTime' contains date information
          y: item.totalPrice,
        }));
        setDataPoints(formattedData);

        // Calculate the total price for a specific date
        const dateToCheck = "2023-11-03T00:00:00.000Z"; // Replace with your desired date
        const totalPrice = calculateTotalPriceOnDate(data, dateToCheck);
        setTotalPriceOnDate(totalPrice);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Bookings",
    },
    axisX: {
      title: "Date",
      valueFormatString: "DD MMM", // Customize the date format
    },
    axisY: {
      includeZero: true,
      title: "Earnings",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
        columnWidth: 2,
      },
    ],
  };

  return (
    <div className="stats">
      <div class="row">
        <div class="col-sm-12 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Upcoming Bookings</h5>
              <ul className="list-group">
                {bookings.map((booking) => (
                  <li className="list-group-item" key={booking._id}>
                    <p>User Email: {booking.userEmail}</p>
                  </li>
                ))}
              </ul>
              <Link to="/allbookings" href="#" class="btn btn-primary">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="chart">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default Stats;
