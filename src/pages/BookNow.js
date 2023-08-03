import LoginPage from "./BookNowPages/Login";
import Signup from "./BookNowPages/Signup";
import Guest from './BookNowPages/Guest';
import BookingPage from './BookingPage/BookingPage';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { useNavigate } from "react-router-dom";


function BookNow({ GuestLogin }) {
  const [serialNumber, setSerialNumber] = useState("");
  const [customerId, setCustomerId] = useState(false);
  const loggedIn=useSelector(state=>state.auth.loggedIn)
  //const emirateNumber = useSelector(state => state.emirate); // Access emirateId from the Redux store
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("serialNo") !== null) {
      setCustomerId(true);
    } else {
      setCustomerId(false);
    }
  }, [customerId]);

  const handleLogin = () => {
    setCustomerId(true);
    //window.location.reload();
    
  };
//
  return (
    <>
    
      {(!loggedIn && !GuestLogin) && <LoginPage setSerialNumber={setSerialNumber} Login={handleLogin} />}
      
      
      {loggedIn  && <BookingPage/>}
      {GuestLogin && <BookingPage/>}
     
     
    </>
  );
}

export default BookNow;
