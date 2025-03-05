import { useState } from "react";
import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}),
      });
      const json= await response.json()
      console.log(json)
  
      if(!json.success)
      {
      alert("enter valid credentials")
      }
      if(json.success){
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem("authToken"))
        navigate("/")
      }
  
    }
  
    const onChange=(event)=>{
      setCredentials({...credentials, [event.target.name]: event.target.value})
    }
  
    return (
      <div className="container my-5">
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-center mb-3">Welcome Back</h1>
          <h3 className="text-center mb-5">
            Login to your <span className="fw-bold fst-italic text-danger">foodster</span> account
          </h3>
  
          <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-danger w-100">Submit</button>
            </form>
            <div className="mt-3 text-center">
              <Link to="/createuser" className="btn btn-secondary btn-sm mt-2">Not a user? Create an Account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
