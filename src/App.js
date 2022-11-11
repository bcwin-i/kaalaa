import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Share from "./pages/Share";
import Dashboard from "./pages/Dashboard";
import Bread from "./pages/Bread";
import ImageContainer from "./components/ImageContainer";
import { Overlay, Row, Wrapper } from "./style";
import ViewLogicContainer from "./components/ViewLogic/ViewLogicContainer";
import { ImageListContainer } from "./styles/Dashboard";
import ImageWrapper from "./components/Images/ImageWrapper";

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
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: 10 }}
    >
      {images.map((data, index) => (
        <ImageWrapper data={data} key={index} index={index}/>
      ))}
    </div>
  );
}

export default App;
