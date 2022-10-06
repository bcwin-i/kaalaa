import React, { useEffect, useState } from "react";
import "./App.css";
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
    // <Routes>
    //   <Route index element={<Dashboard />} />
    // </Routes>
    <>
      {/* <Wrapper key={-1}>
        <img src="https://random.imagecdn.app/120/100" />
        <Overlay>
        <Row>
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833655.png"
            alt="timer"
            height={17}
            width={17}
            
          />
          8 seconds
        </Row>
        </Overlay>
      </Wrapper> */}
      {images.map((data, index) => (
        <>
          <img
            src={data?.url}
            key={index}
            alt={index}
            id={index}
            style={{borderRadius: 20}}
            width={(index % 2) === 0 ? 100 : 300}
            height={(index % 2) === 0 ? 100 : "auto"}
          />
          <br />
        </>
      ))}
    </>
  );
}

export default App;
