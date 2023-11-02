import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";

const Refund = (p) => {
  let { bookingId, handleDeleteBooking } = p;
  let bookingIdModal = `#deleteModal-${bookingId}`;
  let bookingIdModalSmall = `deleteModal-${bookingId}`;
  const [refund, setRefund] = useState(0);
  const calculateRefund = () => {
    axios
      .get("http://localhost:5000/hotel/getRefundDetails/" + bookingId)
      .then((response) => {
        setRefund(response.data.refund);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={bookingIdModal}
        onClick={() => calculateRefund()}
      >
        Delete
      </button>
      <div
        className="modal fade"
        id={bookingIdModalSmall}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Booking
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6>
                The refund initiated will be of {Math.round(refund / 10) * 10}
              </h6>
              <form
                className="container-fluid form-control"
                onSubmit={() => handleDeleteBooking(bookingId)}
              >
                <button
                  type="submit"
                  className="btn btn-danger justify-content-center"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
