import { configureStore } from '@reduxjs/toolkit';
import picturesSliceReducer from 'Services/Redux/Features/picturesSlice';
import userSlice from '../Features/userSlice';

export const store = configureStore({
  reducer: {
    pictures: picturesSliceReducer,
    user: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
