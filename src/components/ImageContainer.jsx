import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ImageListContainer } from "../styles/Dashboard";
import { MdVerified } from "react-icons/md";
import { useRef } from "react";
import { useIsInViewport } from "../hooks/useIsInViewport";

const ImageContainer = ({
  data,
  setSelectedImage,
  viewUpdate,
  setImages,
  images,
}) => {
  const [details, setDetails] = useState(false);
  const ref = useRef(null);
  const isInViewport = useIsInViewport(ref);

  useEffect(() => {
    // viewUpdate(data, images[data?.index]?.timer < 1 ? false : isInViewport);
    if (isInViewport) {
      setTimeout(
        () =>
          setImages((e) =>
            e.map((obj) => {
              if (obj.index === data.index) {
                return { ...obj, timer: obj.timer > 0 ? obj.timer - 1 : 0 };
              }
              return obj;
            })
          ),
        1000
      );
    }
  }, [isInViewport]);

  useEffect(() => {
    if (isInViewport)
      setTimeout(
        () =>
          setImages((e) =>
            e.map((obj) => {
              if (obj.index === data.index) {
                return { ...obj, timer: obj.timer > 0 ? obj.timer - 1 : 0 };
              }
              return obj;
            })
          ),
        1000
      );
  }, [images[data?.index].timer]);

  return (
    <div
      style={{ position: "relative" }}
      onClick={() => setSelectedImage(data)}
      ref={ref}
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
          <span style={{ display: "flex", alignItems: "center" }}>
            {" "}
            Watched
            <MdVerified color={"white"} size={25} style={{ marginLeft: 5 }} />
          </span>
        ) : (
          "Watched: " + data?.timer + " seconds more"
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
