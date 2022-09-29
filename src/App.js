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
    for (let i = 0; i < 10; i++) {
      setImages((e) => [
        ...e,
        {
          url: `https://random.imagecdn.app/${
            i % 2 === 0 ? 120 : 100
          }/100?${i}`, // url: "https://source.unsplash.com/random/?sig=" + i,
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
          <img src={data?.url} key={index} alt={index} />
          <br />
        </>
      ))}
    </>
  );
}

export default App;
