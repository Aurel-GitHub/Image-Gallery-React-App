import { createSlice } from '@reduxjs/toolkit';

const pictureSlice = createSlice({
  name: 'pictures',
  initialState: {
    pictures: null,
  },
  reducers: {
    setPictures: (state, action) => {
      state.pictures = action.payload;
    },
  },
});

export default pictureSlice.reducer;
export const { setPictures } = pictureSlice.actions;
