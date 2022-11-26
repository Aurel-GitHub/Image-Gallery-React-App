import { configureStore } from '@reduxjs/toolkit';
import pictureSliceReducer from 'Services/Redux/Features/picturesSlice';
import userSlice from '../Features/userSlice';

export const store = configureStore({
  reducer: {
    pictures: pictureSliceReducer,
    user: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
