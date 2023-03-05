import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
