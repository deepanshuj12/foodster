import React from "react";

export default function Carousel({setSearchTerm}) {

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-caption d-block" style={{"zIndex":"10"}}>
            <div className="container">
            <div className="d-flex w-100 justify-content-center " >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchChange}
              />
            </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="/image1.jpg"
              className="d-block w-100"
              style={{"filter":"brightness(30%)", "objectFit": "cover", height: "500px"}}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/image2.jpg"
              className="d-block w-100"
              style={{"filter":"brightness(30%)", "objectFit": "cover", height: "500px"}}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/image3.jpg"
              className="d-block w-100"
              style={{"filter":"brightness(30%)", "objectFit": "cover", height: "500px"}}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
