import { createSlice } from '@reduxjs/toolkit';

const wfhRequestSlice = createSlice({
  name: 'wfhRequestSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchEmpWfhRequestData: (state) => {
      state.isLoading = true;
    },
    getEmpWfhRequestDataSuccess: (state, action) => {
      state.data = { ...action?.payload };
      state.isLoading = false;
    },
    getEmpWfhRequestFilteredDataSuccess: (state, action) => {
      state.data = { ...state.data, ...action?.payload };
      state.isLoading = false;
    },
    getEmpWfhRequestDataFailed: (state) => {
      state.isLoading = false;
    },
    deleteEmpWfhRequest: (state) => {
      state.isLoading = true;
    },
    deleteEmpWfhRequestSuccess: (state, action) => {
      const tempData = state?.data?.requests.filter(
        (el) => el.id !== action?.payload
      );
      state.data.requests = tempData;
      state.isLoading = false;
    },
    deleteWfhRequestDataFailed: (state) => {
      state.isLoading = false;
    },
    createEmpWfhRequest: (state) => {
      state.isLoading = true;
    },
    createEmpWfhRequestSuccess: (state, action) => {
      if (!Array.isArray(state.data.requests)) {
        state.data.requests = [];
      }
      state.data.requests = [...state.data.requests, action?.payload];
      state.isLoading = false;
    },
    createEmpWfhRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getEmpWfhRequestDataSuccess,
  fetchEmpWfhRequestData,
  getEmpWfhRequestDataFailed,
  deleteEmpWfhRequest,
  deleteEmpWfhRequestSuccess,
  deleteWfhRequestDataFailed,
  createEmpWfhRequest,
  createEmpWfhRequestSuccess,
  createEmpWfhRequestFailed,
  getEmpWfhRequestFilteredDataSuccess,
} = wfhRequestSlice.actions;
export default wfhRequestSlice.reducer;
