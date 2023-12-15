// redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Define your initial state here
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Define your reducers here
  },
});

export const {
  /* your actions */
} = appSlice.actions;
export default appSlice.reducer;
