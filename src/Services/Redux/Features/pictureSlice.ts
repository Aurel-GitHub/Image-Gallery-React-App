import { createSlice } from '@reduxjs/toolkit';

const pictureSlice = createSlice({
  name: 'pictures',
  initialState: {
    picture: null,
  },
  reducers: {
    setPicture: (state, { payload }) => {
      state.picture = payload;
    },
  },
});

export default pictureSlice.reducer;
export const { setPicture } = pictureSlice.actions;
