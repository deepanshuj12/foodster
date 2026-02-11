import React, { useState, useEffect } from "react";
import Cards from "./Cards";

export default function CardDisplay({ searchTerm }) {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItems, setfoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API}/CardData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    response = await response.json();
    setfoodItems(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      {foodCat.length > 0 ? (
        foodCat.map((data, index) => {
          return (
            <div className="row mb-3">
              <div key={data._id} className="fs-4">
               {<strong>{data.CategoryName}</strong>}
              </div>
              <hr />
         {foodItems.length > 0 ? (
                foodItems
                  .filter((data2) => (data.CategoryName === data2.CategoryName)  && data2.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((data2, index) => {
                    return (
                      <div key={data2._id} className="col-md-6 col-lg-3 col-12 mb-2">
                        <Cards foodItem={data2} options={data2.options[0]}
                        />
                      </div>
                    );
                  })
              ) : (
                <div>Loading items...</div>
              )}
            </div>
          );
        })
      ) : (
        <div>Rendering error</div>
      )}
    </div>
  );
}
