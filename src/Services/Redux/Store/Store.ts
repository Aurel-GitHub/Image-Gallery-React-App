import { configureStore } from '@reduxjs/toolkit';
import picturesSliceReducer from 'Services/Redux/Features/picturesSlice';
import userSlice from 'Services/Redux/Features/userSlice';
import pictureSlice from 'Services/Redux/Features/pictureSlice';

export const store = configureStore({
  reducer: {
    pictures: picturesSliceReducer,
    picture: pictureSlice,
    user: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
