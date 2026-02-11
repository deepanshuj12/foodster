
import React from "react";
import {
  useCartDispatchContext,
  useCartStateContext,
} from "../components/ContextReducer";
import { TbShoppingCartOff } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {

  const data = useCartStateContext();
  const dispatch = useCartDispatchContext();
  if (data.length === 0) {
    return (
      <>
      <Navbar/>
      <div className="d-flex flex-column align-items-center my-5">
        <TbShoppingCartOff size={64} className="text-muted mb-3" />
        <h2 className="text-muted">The Cart Is Empty</h2>
        <p className="text-muted">Your cart is currently empty. Start your foodie journey now!</p>
        <Link to="/" className="btn btn-outline-danger mt-3">Browse Foods</Link>
      </div>
      <div style={{marginTop:"20%"}}><Footer /></div>
      </>
    );
  }
  
  let totalPrice= data.reduce((total,food)=>total+food.price , 0)

  const handleOrder = async () => {
    let userEmail = localStorage.getItem("userEmail");
    
    let response = await fetch(`${process.env.REACT_APP_API}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            order_data: data, // Send the data array as is
            email: userEmail,
            order_date: new Date().toDateString(),
        }),
    });
    if (response.status === 200) {
        dispatch({ type: "DROP" });
    }
};

  return (
    <div>
      <Navbar/>
      <div className="container m-auto mt-5 ">
        <table className=" table">
          <thead>
            <tr>
              <th scope="col" className="text-danger fw-bold fs-3">
                #
              </th>
              <th scope="col" className="text-danger fw-bold fs-3">
                Food Name
              </th>
              <th scope="col" className="text-danger fw-bold fs-3">
                Quantity
              </th>
              <th scope="col" className="text-danger fw-bold fs-3">
                Size
              </th>
              <th scope="col" className="text-danger fw-bold fs-3">
                Price
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn  btn-outline-danger btn-sm" onClick={()=>{dispatch({type:"REMOVE", index:index})}}><CiTrash className="mb-1"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className="fs-3"> Total: Rs.{totalPrice}</h1></div>
        <div> <button className="btn btn-outline-success mt-5 btn-lg" onClick={handleOrder}> Order!</button></div>
      </div>
      <Footer/>
    </div>
  );
}
