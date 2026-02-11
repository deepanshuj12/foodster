import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name ,email: credentials.email, password: credentials.password, location: credentials.geolocation}),
    });
    const json= await response.json()
    console.log(json)
    console.log(process.env.REACT_APP_API);
    if(!json.success)
    {
    alert(json.message || "Enter valid credentials")
    }
    else{
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
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
          Create your <span className="fw-bold fst-italic text-danger">foodster</span> account
        </h3>

        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
              </div>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">Address</label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt /></span>
                <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-danger w-100">Submit</button>
          </form>
          <div className="mt-3 text-center">
            <Link to="/login" className="btn btn-secondary btn-sm mt-2">Already a user? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

