import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "imagesLogic",
  initialState: {
    imageList: [],
  },
  reducers: {
    add: (state, action) => {
      const exist = state.imageList.findIndex((object) => {
        return object.url === action.payload?.url;
      });
      if (exist === -1) state.imageList.push(action.payload);
    },
    changeImageTimer: (state, action) => {
      const images = [...state];
      state.imageList[action.payload?.index] = action.payload?.timer - 1;
      state.imageList = images;
    },
  },
});

export const { add, changeImageTimer } = imagesSlice.actions;

export default imagesSlice.reducer;
