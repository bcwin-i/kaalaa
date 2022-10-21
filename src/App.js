import React, { useEffect, useState } from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Share from "./pages/Share";
import Dashboard from "./pages/Dashboard";
import Bread from "./pages/Bread";
import ImageContainer from "./components/ImageContainer";
import { Overlay, Row, Wrapper } from "./style";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // url: "https://source.unsplash.com/random/?sig=" + i,
    for (let i = 0; i < 10; i++) {
      setImages((e) => [
        ...e,
        {
          url: "https://source.unsplash.com/random/10×10?" + i,
          index: i,
          timer: 10,
        },
      ]);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#EEEEEE", height: "max-content"}}>
      {/* <div className="product_wrapper">
        <div className="product_image_wrapper">
          <img
            className="product_image"
            src="https://source.unsplash.com/random/"
          />
          <div className="timer_container">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="8.25"
                stroke="black"
                stroke-width="1.5"
              />
              <path
                d="M12 7V12"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
        <h2 className="product_name">Product name #</h2>
        <p className="product_desc">Descrition of the prodcut</p>
        <button className="product_button">BUY FOR $10</button>
      </div> */}
      <div className="qr" style={{ padding: 20 }}></div>
      {images.map((data, index) => (
        <>
          <img
            src={data?.url}
            key={index}
            alt={index}
            id={index}
            style={{ margin: "10px 0" }}
            width={index % 2 === 0 ? 100 : 300}
            height={index % 2 === 0 ? 100 : "auto"}
          />
          <br />
        </>
      ))}
    </div>
  );
}

export default App;
