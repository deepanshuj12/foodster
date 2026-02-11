import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 fw-bold fst-italic text-danger">
            foodster
          </Link>
          <span className="mb-3 mb-md-0 text-muted">© 2024 foodster, Inc</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <div className="text-muted" >
              <FaEnvelope size={24} />
              :ddeeppanshuj229@gmail.com
            </div>
          </li>
        </ul>
      </footer>
    </div>
  );
}
