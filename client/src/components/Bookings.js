import React, { useState, useEffect } from "react";
import axios from "axios";
import EditBookingForm from "./Forms/EditBookingForm";
import Header from "../Layout/Header";
import Refund from "./Refund";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [placeholdertext, setplaceholdertext] = useState("Select The Filter");
  const [value, setvalue] = useState("");

  const handleallBooking = () => {
    setplaceholdertext("Select The Filter");
    axios
      .get("http://localhost:5000/hotel/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    handleallBooking();
  }, []);

  const handleDeleteBooking = (bookingId) => {
    // Make a DELETE request to delete the booking with the given bookingId
    axios
      .delete(`http://localhost:5000/hotel/bookings/${bookingId}`)
      .then(() => {
        // Remove the deleted booking from the state
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };
  const handleplaceholder = (type) => {
    setplaceholdertext(`${type}`);
  };

  const handlefilter = () => {
    const queryparams = {
      filtertype: placeholdertext,
      value: value,
    };
    axios
      .get("http://localhost:5000/hotel/bookings", { params: queryparams })
      .then((response) => {
        setBookings(response.data);
      });
  };

  return (
    <div>
      <Header />
      <div className="filters">
        <div class="input-group mb-3">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={() => handlefilter()}
          >
            Filter
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <button
                class="dropdown-item"
                href="#"
                onClick={() => handleallBooking()}
              >
                All Bookings
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                href="#"
                onClick={() => handleplaceholder("Room Number")}
              >
                Room Number
              </button>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => handleplaceholder("Room Type")}
              >
                Room Type
              </a>
            </li>

            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => handleplaceholder("Start time")}
              >
                Start Time
              </a>
            </li>
          </ul>
          {placeholdertext === "Select The Filter" ? (
            <input
              type="text"
              class="form-control"
              aria-label="Text input with segmented dropdown button"
              placeholder={placeholdertext}
              value={""}
              disabled
            />
          ) : (
            <input
              type="text"
              class="form-control"
              aria-label="Text input with segmented dropdown button"
              placeholder={placeholdertext}
              onChange={(e) => setvalue(e.target.value)}
            />
          )}
        </div>
      </div>
      <h1>Booking List</h1>
      <table className="table table-success table-striped-columns">
        <thead>
          <tr>
            <th className="text-center">User Email</th>
            <th className="text-center">Room Number</th>
            <th className="text-center">Start Time</th>
            <th className="text-center">End Time</th>
            <th className="text-center">Total Price</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="text-center">{booking.userEmail}</td>
              <td className="text-center">{booking.roomNumber}</td>

              <td className="text-center">
                {new Date(booking.startTime).toLocaleString()}
              </td>

              <td className="text-center">
                {new Date(booking.endTime).toLocaleString()}
              </td>

              <td className="text-center">
                Rs {Math.ceil(booking.totalPrice / 10) * 10}
              </td>
              <td className="text center">
                <div className="d-flex justify-content-center align-items-center">
                  <EditBookingForm booking={booking} />
                  <Refund
                    bookingId={booking._id}
                    handleDeleteBooking={handleDeleteBooking}
                  />
                </div>
                {/* <button
                  className="btn btn-danger m-3 text-center"
                  onClick={() => handleDeleteBooking(booking._id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;
