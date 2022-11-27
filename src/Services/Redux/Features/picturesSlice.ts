import { IPictures } from 'Services/Utils/Interfaces';
import { createSlice } from '@reduxjs/toolkit';

const picturesSlice = createSlice({
  name: 'pictures',
  initialState: {
    pictures: Array<IPictures>(),
  },
  reducers: {
    setPictures: (state, { payload }) => {
      state.pictures = payload;
    },
    addPicture: (state, { payload }) => {
      state.pictures.push(payload);
    },
    editPicture: (state, { payload }) => {
      state.pictures = state.pictures.map((picture) => {
        if (picture.id === payload[1]) {
          return {
            ...picture,
            artist: payload[0],
          };
        } else {
          return picture;
        }
      });
    },
    deletePicture: (state, { payload }) => {
      state.pictures = state.pictures.filter((picture) => picture.id !== payload);
    },
  },
});

export default picturesSlice.reducer;
export const { setPictures, addPicture, editPicture, deletePicture } = picturesSlice.actions;
