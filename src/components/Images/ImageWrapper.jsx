import React, { useState } from "react";
import { ImageListContainer } from "../../styles/Dashboard";
import { BsFillShareFill } from "react-icons/bs";
import shareCanvasAsImage from "../../services/share";
import Swal from "sweetalert2";

const ImageWrapper = ({ data, index }) => {
  const [isShown, setIsShown] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const toggleDisplay = (status) => {
    console.log(index, status);
    setIsShown(status);
  };

  const share = async () => {
    const sh = await shareCanvasAsImage(data.url, index);
    Swal.fire({
      title: sh ? "Success" : "Error",
      text: sh ? "Image shared" : "Image not shared",
      icon: sh ? "success" : "error",
    });
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          height: "min-content",
        }}
        onMouseEnter={() => toggleDisplay(true)}
        onMouseLeave={() => toggleDisplay(false)}
      >
        <ImageListContainer
          src={data.url}
          style={{ margin: 0, borderRadius: 0 }}
          id={"image-" + index}
        />
        <button
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: 10,
            display: "flex",
            backgroundColor: "rgba(256,256,256,0.9)",
            zIndex: 1,
            alignItems: "center",
            border: "none",
            borderRadius: "0 10px 0 0",
            cursor: "pointer",
            fontSize: 12,
          }}
          onClick={() => share()}
        >
          <BsFillShareFill
            color="#0078C9"
            size={30}
            style={{ marginRight: 10 }}
          />
          Share image
        </button>
      </div>
      {feedback}
    </>
  );
};

export default ImageWrapper;
