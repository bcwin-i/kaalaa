import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./viewLogic/imageSlice";

export default configureStore({
  reducer: {
    images: imageReducer,
  },
});
