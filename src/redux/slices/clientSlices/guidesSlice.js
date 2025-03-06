import { createSlice } from '@reduxjs/toolkit';

const guidesSlice = createSlice({
  name: 'guidesSlice',
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    fetchClientGuidesRequest: (state) => {
      state.isLoading = true;
    },
    fetchClientGuidesRequestSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
    fetchClientGuidesRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchClientGuidesRequest,
  fetchClientGuidesRequestSuccess,
  fetchClientGuidesRequestFailed,
} = guidesSlice.actions;
export default guidesSlice.reducer;
