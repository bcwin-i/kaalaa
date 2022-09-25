import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ImageListContainer } from "../styles/Dashboard";
import { MdVerified } from "react-icons/md";

const ImageContainer = ({ data, setSelectedImage }) => {
  const [details, setDetails] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onClick={() => setSelectedImage(data)}
    >
      <ImageListContainer
        src={data.url}
        key={data.index}
        onMouseEnter={() => setDetails(true)}
        onMouseLeave={() => setDetails(false)}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 15,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "15px",
          padding: 10,
          color: "white",
          opacity: details ? 1 : 0,
          transition: "0.5s all ease-in-out",
          cursor: "pointer",
        }}
        onMouseEnter={() => setDetails(true)}
        onMouseLeave={() => setDetails(false)}
      >
        <span style={{ fontWeight: "bold" }}>Item {data.index}</span>
        <br />
        {data?.timer === 0 ? (
          <span style={{display: "flex", alignItems: "center"}}>
            {" "}
            Watched<MdVerified color={"white"} size={25} style={{marginLeft: 5}}/>
          </span>
        ) : (
          "Watched: " + data?.timer + " seconds more"
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
