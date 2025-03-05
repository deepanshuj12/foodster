import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const fetchMyOrder = async () => {
        console.log(localStorage.getItem("userEmail"));
        await fetch("http://localhost:5000/api/myorders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        }).then(async (res) => {
          let response = await res.json();
          setOrderData(response);
        });
      };

      fetchMyOrder();
    }
  }, [token, navigate]);

  const isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {!isEmpty(orderData) &&
          Array.isArray(orderData.orderData?.order_data) ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  Array.isArray(item) &&
                  item.map((arrayData, arrayIndex) => {
                    return (
                      <div key={arrayIndex}>
                        {arrayData.Order_date ? (
                          <div className="m-auto mt-5">
                            <hr />
                            {arrayData.Order_date}
                          </div>
                        ) : (
                          <div className="col-12 col-md-6 col-lg-3">
                            <div
                              className="card mt-3"
                              style={{ width: "16rem", maxHeight: "360px" }}
                            >
                              <img
                                src={arrayData.img}
                                className="card-img-top"
                                alt="..."
                                style={{ height: "120px", objectFit: "cover" }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{arrayData.name}</h5>
                                <div
                                  className="container w-100 p-0"
                                  style={{ height: "38px" }}
                                >
                                  <span className="m-1">{arrayData.qty}</span>
                                  <span className="m-1">{arrayData.size}</span>
                                  <div className="d-inline ms-2 h-100 w-20 fs-5">
                                    ₹{arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                );
              })
          ) : (
            <div className="d-flex flex-column align-items-center my-5">
              <FaShoppingCart size={64} className="text-muted mb-3" />
              <h2 className="text-muted">No orders found</h2>
              <p className="text-muted">You haven't placed any orders yet. Start your foodie journey!</p>
              <Link to="/" className="btn btn-outline-danger mt-3">Browse Foods</Link>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "20%" }}>
        <Footer />
      </div>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link,useNavigate } from "react-router-dom";

// export default function MyOrder() {
  
//   const [orderData, setOrderData] = useState(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("authToken");
//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }  else{

//   const fetchMyOrder = async () => {
//     console.log(localStorage.getItem("userEmail"));
//     await fetch("http://localhost:5000/api/myorders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: localStorage.getItem("userEmail"),
//       }),
//     }).then(async (res) => {
//       let response = await res.json();
//       setOrderData(response);
//     });
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   const isEmpty = (obj) => {
//     return !obj || Object.keys(obj).length === 0;
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <div className="row">
//           {!isEmpty(orderData) &&
//           Array.isArray(orderData.orderData?.order_data) ? (
//             orderData.orderData.order_data
//               .slice(0)
//               .reverse()
//               .map((item, index) => {
//                 return (
//                   Array.isArray(item) &&
//                   item.map((arrayData, arrayIndex) => {
//                     return (
//                       <div key={arrayIndex}>
//                         {arrayData.Order_date ? (
//                           <div className="m-auto mt-5">
//                             <hr />
//                             {arrayData.Order_date}
//                           </div>
//                         ) : (
//                           <div className="col-12 col-md-6 col-lg-3">
//                             <div
//                               className="card mt-3"
//                               style={{ width: "16rem", maxHeight: "360px" }}
//                             >
//                               <img
//                                 src={arrayData.img}
//                                 className="card-img-top"
//                                 alt="..."
//                                 style={{ height: "120px", objectFit: "cover" }}
//                               />
//                               <div className="card-body">
//                                 <h5 className="card-title">{arrayData.name}</h5>
//                                 <div
//                                   className="container w-100 p-0"
//                                   style={{ height: "38px" }}
//                                 >
//                                   <span className="m-1">{arrayData.qty}</span>
//                                   <span className="m-1">{arrayData.size}</span>
//                                   <div className="d-inline ms-2 h-100 w-20 fs-5">
//                                     ₹{arrayData.price}/-
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })
//                 );
//               })
//           ) : (
//             <div className="d-flex flex-column align-items-center my-5">
//               <FaShoppingCart size={64} className="text-muted mb-3" />
//               <h2 className="text-muted">No orders found</h2>
//               <p className="text-muted">You haven't placed any orders yet. Start your foodie journey!</p>
//               <Link to="/" className="btn btn-outline-danger mt-3">Browse Foods</Link>
//             </div>
//           )}
//         </div>
//       </div>
//       <div style={{marginTop:"20%"}}><Footer /></div>
//     </div>
//   );
// }})
// }

