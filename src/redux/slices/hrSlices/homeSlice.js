import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    homeData: {},
  },
  reducers: {
    addHomeData: (state, action) => {
      state.homeData = action.payload;
    },
  },
});

export const { addHomeData } = homeSlice.actions;
export default homeSlice.reducer;
