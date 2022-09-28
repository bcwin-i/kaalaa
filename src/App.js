import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Share from "./pages/Share";
import Dashboard from "./pages/Dashboard";
import Bread from "./pages/Bread";
import ImageContainer from "./components/ImageContainer";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setImages((e) => [
        ...e,
        {
          url: "https://random.imagecdn.app/100/100?index"+i, // url: "https://source.unsplash.com/random/?sig=" + i,
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
    images.map((data, index) => (
      <>
        <img src={data?.url} key={index}/>
        <br />
      </>
    ))
  );
}

export default App;
