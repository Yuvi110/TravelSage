import BookingList from "./components/Bookings";
import BookingForm from "./components/Forms/BookingForm";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbookings" element={<BookingList />} />
        <Route path="/createbooking" element={<BookingForm />} />
      </Routes>
    </>
  );
}

export default App;
