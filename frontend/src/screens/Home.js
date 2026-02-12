import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CardDisplay from "../components/CardDisplay";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel setSearchTerm={setSearchTerm} />
      <div className="m-2">
        {isLoggedIn ? (
          <CardDisplay searchTerm={searchTerm} />
        ) : (
          <div className="text-center my-5">
            <h2>Welcome to foodster!</h2>
            <p>Please log in to see what's cooking today.</p>
            <Link to="/login" className="btn btn-outline-danger">
              Login
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Home;


