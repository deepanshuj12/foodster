import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStateContext, useCartDispatchContext } from "./ContextReducer";
import { BsCart4 } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
export default function Navbar() {

  const navigate= useNavigate();
  const data= useCartStateContext();
  const handleLogout= ()=>{
    localStorage.removeItem("authToken")
    navigate("/")
    window.location.reload();
  }
 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-3 fw-bold fst-italic text-light"
            to="/"
          >
            foodster
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li className="nav-item ">
                <Link
                  className="nav-link text-light"
                  aria-current="page"
                  to="/"
                ></Link>
              </li>
              {
                (localStorage.getItem("authToken"))?
                <li className="nav-item ">
                <Link
                  className="nav-link text-light"
                  aria-current="page"
                  to="/myorders"
                > My Orders</Link>
              </li> : ""
              }
            </ul>
            { (localStorage.getItem("authToken"))?
            
            <div className="d-flex">
              <Link
            className=" nav-link text-light m-2 my-2 me-auto"
            to="/cart"
          > {data.length===0? "":
            <GoDotFill className="text-warning fs-3"/>}<BsCart4 className="me-1 mb-1"/>
            My Cart 
          </Link>
            <Link
            className="btn btn-light text-danger  mx-2"
             onClick={handleLogout}
          >
            Logout
          </Link></div>
            :
              <div className="d-flex justify-content-end ">
              <Link
                className="btn btn-outline-light text-white  mx-2"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-light text-white "
                to="/createuser"
              >
                Signup
              </Link>
            </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}
