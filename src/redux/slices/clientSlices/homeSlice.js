import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchClientHomeDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchClientHomeDataRequestSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
    fetchClientHomeDataRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchClientHomeDataRequest,
  fetchClientHomeDataRequestSuccess,
  fetchClientHomeDataRequestFailed,
} = homeSlice.actions;
export default homeSlice.reducer;
