// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import ordenesReducer from './ordenesSlice';

export const store = configureStore({
  reducer: {
    ordenes: ordenesReducer,
  },
});