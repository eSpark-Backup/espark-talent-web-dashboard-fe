import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    homeData: {},
  },
  reducers: {
    getHomeData: (state, action) => {
      state.homeData = action.payload;
    },
  },
});

export const { getHomeData } = homeSlice.actions;
export default homeSlice.reducer;
