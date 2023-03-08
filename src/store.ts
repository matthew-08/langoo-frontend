/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import convoSlice from './features/convoSlice';
import usersSlice from './features/usersSlice';
import messagesSlice from './features/messagesSlice';
import viewSlice from './features/viewSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    convoSlice,
    usersSlice,
    messagesSlice,
    viewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
