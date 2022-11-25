import { configureStore } from '@reduxjs/toolkit';
import picturesliceReducer from 'Services/Redux/Features/picturesSlice';

export const store = configureStore({
  reducer: {
    pictures: picturesliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
