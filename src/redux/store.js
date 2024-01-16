// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileMenuSlice from './slices/profileMenuSlice';
import workSpaceMenuSlice from './slices/workSpaceMenuSlice';

const store = configureStore({
  reducer: {
    profileMenu: profileMenuSlice,
    workSpaceMenu: workSpaceMenuSlice,
  },
});

export default store;
