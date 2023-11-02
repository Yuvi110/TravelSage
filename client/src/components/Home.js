import React from "react";
import Header from "../Layout/Header";
import BookingList from "./Bookings";
import BookingForm from "./Forms/BookingForm";
import Stats from "./Stats";

const Home = () => {
  return (
    <>
      <Header />
      <Stats />
      {/* <BookingForm /> */}
    </>
  );
};

export default Home;
