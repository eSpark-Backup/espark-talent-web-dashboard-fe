import { createSlice } from '@reduxjs/toolkit';

const empGuidesSlice = createSlice({
  name: 'empGuidesSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchEmpGuidesDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchEmpGuidesDataRequestSuccess: (state, action) => {
      state.data = { ...action.payload };
      state.isLoading = false;
    },
    fetchEmpGuidesDataRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchEmpGuidesDataRequest,
  fetchEmpGuidesDataRequestSuccess,
  fetchEmpGuidesDataRequestFailed,
} = empGuidesSlice.actions;
export default empGuidesSlice.reducer;
