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
import { subscribeUser } from "./notification/subscription";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // url: "https://source.unsplash.com/random/?sig=" + i,
    for (let i = 1; i <= 6; i++) {
      setImages((e) => [
        ...e,
        {
          url: require("./assets/image" + i + ".jpg"),
          index: i,
          timer: 10,
        },
      ]);
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: 10 }}>
        {images.map((data, index) => (
          <ImageWrapper data={data} key={index} index={index} />
        ))}
      </div>
      <button className="button" onClick={() => subscribeUser()}>
        Subscribe to notifications
      </button>
    </>
  );
}

export default App;
