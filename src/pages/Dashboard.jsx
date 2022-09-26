import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ImageContainer from "../components/ImageContainer";
import {
  DashboardContainer,
  ImageListContainer,
  ImageView,
  WorkSpace,
  WorkView,
} from "../styles/Dashboard";
import {
  FlexColumn,
  FlexRow,
  Logo,
  LogoDesc,
  LogoName,
} from "../styles/General";
import { colors } from "../utils/colors";
import { MdVerified } from "react-icons/md";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [views, setViews] = useState([]);
  const [counter, setCounter] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setImages((e) => [
        ...e,
        {
          url: "https://source.unsplash.com/random/?sig=" + i,
          index: i,
          timer: 10,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (
      selectedImage?.timer !== 0 &&
      selectedImage?.index === selectedImage?.index &&
      selectedImage !== null
    )
      if (images[selectedImage?.index]?.timer > 0)
        setTimeout(() => {
          updateState();
        }, 1000);
  }, [selectedImage]);

  useEffect(() => {
    if (
      selectedImage?.timer !== 0 &&
      selectedImage?.index === selectedImage?.index &&
      selectedImage !== null
    )
      if (images?.length === 10)
        if (images[selectedImage?.index]?.timer > 0)
          setTimeout(() => {
            updateState();
          }, 1000);
  }, [images]);

  const updateState = () => {
    console.log("Update called: ");
    const newState = images.map((obj) => {
      if (obj.index === selectedImage.index) {
        return { ...obj, timer: obj.timer > 0 ? obj.timer - 1 : 0 };
      }
      return obj;
    });

    setImages(newState);
  };

  const viewUpdate = (item, status) => {
    const data = status
      ? setViews((e) => [...e, item])
      : setViews((e) => e.filter((val) => val.index !== item.index));
  };

  return (
    <DashboardContainer>
      <WorkView>
        <FlexColumn>
          {/* <LogoDesc>Items to View</LogoDesc> */}
          {images.map((data, index) => (
            <ImageContainer
              data={data}
              key={index}
              index={index}
              setSelectedImage={setSelectedImage}
              setImages={setImages}
              images={images}
              selectedImage={selectedImage}
              viewUpdate={viewUpdate}
            />
          ))}
        </FlexColumn>
        <WorkSpace>
          {selectedImage === null ? (
            "Select an item to view for your reward"
          ) : (
            <>
              <ImageView src={selectedImage?.url} />
              {images[selectedImage?.index]?.timer === 0 ? (
                <>
                  {" "}
                  <MdVerified color={"green"} size={25} /> Watched
                </>
              ) : (
                images[selectedImage?.index]?.timer + " seconds"
              )}
            </>
          )}
        </WorkSpace>
      </WorkView>
    </DashboardContainer>
  );
};

export default Dashboard;
