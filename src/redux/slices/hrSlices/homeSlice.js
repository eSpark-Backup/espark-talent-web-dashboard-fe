import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    homeData: {},
    isLoading: false,
  },
  reducers: {
    getHomeData: (state, action) => {
      state.homeData = action.payload;
      state.isLoading = false;
    },
    getHomeDataRequest: (state) => {
      state.isLoading = true;
    },
  },
});

export const { getHomeData, getHomeDataRequest } = homeSlice.actions;
export default homeSlice.reducer;
