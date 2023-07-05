import React, { useState } from "react";
import { ImageListContainer } from "../../styles/Dashboard";
import { BsFacebook, BsFillShareFill } from "react-icons/bs";
import { shareCanvasAsImage, shareToFaceBook } from "../../services/share";
import Swal from "sweetalert2";

const ImageWrapper = ({ data, index }) => {
  const [isShown, setIsShown] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const toggleDisplay = (status) => {
    console.log(index, status);
    setIsShown(status);
  };

  const share = async (fb) => {
    const sh = await (fb
      ? shareToFaceBook(data.url)
      : shareCanvasAsImage(data.url, index));
    Swal.fire({
      title: sh.status ? "Success" : "Error",
      text: sh.message,
      icon: sh.status ? "success" : "error",
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(256,256,256,0.9)",
            zIndex: 1,
            alignItems: "center",
            border: "none",
            // borderRadius: "0 10px 0 0",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          <BsFillShareFill
            color="#0078C9"
            size={30}
            style={{ marginRight: 10 }}
            onClick={() => share(false)}
          />

          <BsFacebook
            color="#0078C9"
            size={30}
            style={{ marginRight: 10 }}
            onClick={() => share(true)}
          />
        </div>
      </div>
      {feedback}
    </>
  );
};

export default ImageWrapper;
