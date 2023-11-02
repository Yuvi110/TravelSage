import React, { useState } from "react";
import axios from "axios";
import "../styles.css";
import * as bootstrap from "bootstrap";
import Header from "../../Layout/Header";
window.bootstrap = bootstrap;

function BookingForm() {
  const [userEmail, setUserEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [message, setMessge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      userEmail,
      roomNumber,
      startTime,
      endTime,
    };
    axios
      .post("http://localhost:5000/hotel/bookRoom", bookingData)
      .then((response) => {
        setUserEmail("");
        setRoomNumber("");
        setStartTime("");
        setEndTime("");
        setMessge(response.data.message);
        let toastLiveExample;
        if (response.data.success) {
          toastLiveExample = document.getElementById("liveToastSuccess");
        } else {
          toastLiveExample = document.getElementById("liveToastFailure");
        }

        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
      })
      .catch((error) => {
        setMessge("Something Went Wrong!");
        const toastLiveExample = document.getElementById("liveToastFailure");

        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
        console.error("Error sending data:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastSuccess"
          className="toast text-bg-success"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">MyApp</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastFailure"
          className="toast text-bg-danger"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">MyApp</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
      <h2>Create a New Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userEmail" className="form-label">
            User Email
          </label>
          <input
            type="text"
            className="form-control"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group-1">
          <div className="form-group">
            <label htmlFor="startTime" className="form-label">
              Start Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime" className="form-label">
              End Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="roomNumber" className="form-label">
            Room Number
          </label>
          <input
            type="text"
            className="form-control"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <center>
          <button type="submit" className="submitButton">
            Book Room
          </button>
        </center>
      </form>
    </div>
  );
}

export default BookingForm;
