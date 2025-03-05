import React, { useEffect, useRef, useState } from "react";
import { useCartStateContext, useCartDispatchContext } from "./ContextReducer";
export default function Cards(props) {
  
  const dispatch= useCartDispatchContext();
  const options= props.options;
  const data= useCartStateContext();
  const priceRef = useRef();
  const prices=Object.keys(options);
  const[qty, setQty]= useState(1);
  const[size, setSize]= useState("");
  const [isHovered, setIsHovered] = useState(false);

  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    transition: "box-shadow 0.3s ease",
    ...(isHovered && {
      boxShadow: "0 0 10px 3px red"
    }),
  };

  const handleCart= async()=>{
    
    let food=null
    for(const item of data)
    {
      if (item.id === props.foodItem._id && item.size === size)
      {
        food=item;
        break;
      }
    }

    if (food) {
      console.log("Updating item:", { id: props.foodItem._id, qty: qty, price: finalPrice, size: size });
      await dispatch({ type: "UPDATE", qty: parseInt(qty), price: finalPrice, id: props.foodItem._id, size: size });
      return;
    } else {
      console.log("Adding new item:", { id: props.foodItem._id, qty: qty, price: finalPrice, size: size });
      await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: parseInt(qty), size: size });
      return;
    }
  
    await dispatch({type: "ADD", id:props.foodItem._id, img: props.foodItem.img,
      name:props.foodItem.name, price:finalPrice, qty:qty, size:size})

  }
  const finalPrice= qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  return (
    <div className=" w-100">
        <div className="card " style={{ width: "16rem", height: "100%" }}>
          <img src={props.foodItem.img} className="card-img-top" style={{objectFit: "cover",height: "200px"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className=" m-2 h-100 rounded border-danger text-danger" onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(3), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className=" h-100 rounded border-danger text-danger" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {
                  prices.map((data)=>
                  {return(
                    <option key={data} value={data}>{data}</option>
                  )})
                }
              </select>
              <div className=" mx-2 fs-6">Rs.{finalPrice}</div>
              <hr/>
              <h5 className=" btn btn-sm rounded border-danger text-danger" onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} onClick={handleCart} style={buttonStyle}>Add to cart </h5>
            </div>
          </div>
        </div>
        </div>
  );
}
