import React, { useState, useEffect } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
const EditBookingForm = (booking) => {
  const [userEmail, setUserEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const bookingId = booking.booking._id;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotel/bookings/${bookingId}`)
      .then((response) => {
        const data = response.data;
        setUserEmail(data.userEmail);
        setRoomNumber(data.roomNumber);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEditBooking = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the API
    const editedBooking = {
      userEmail: userEmail,
      roomNumber: roomNumber,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/hotel/bookings/${bookingId}`,
        editedBooking
      );

      if (response.status === 200) {
        // Handle a successful response, e.g., display a success message.
        setMessage("Booking updated successfully");
        let toastLiveExample;
        toastLiveExample = document.getElementById("liveToastSuccess");

        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
        console.log("Booking updated successfully");
      } else {
        // Handle errors, e.g., display an error message.
        setMessage("Failed to update booking");
        let toastLiveExample;
        toastLiveExample = document.getElementById("liveToastFailure");

        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
        console.error("Failed to update booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
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
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Bookings
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="container-fluid form-control"
                onSubmit={handleEditBooking}
              >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Room Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputRoom"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="exampleInputStart"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="exampleInputEnd"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBookingForm;
