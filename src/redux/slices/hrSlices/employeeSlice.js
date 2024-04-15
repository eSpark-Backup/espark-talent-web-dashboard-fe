import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: {
    data: [],
    isLoading: false,
    addEmployeeForm: {},
    assets: [],
    attendance: [],
    currentEmployee: {},
    currentEmployeeClients: {
      active: [],
      inActive: [],
    },
    timeAndLeaves: {
      time: [],
      leaves: [],
    },
  },
  reducers: {
    getEmpData: (state) => {
      state.isLoading = true;
    },
    getEmpDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = true;
    },
    getEmpDataFailed: (state) => {
      state.isLoading = true;
    },
    addEmployeeFormData: (state, action) => {
      state.addEmployeeForm = {
        ...state.addEmployeeForm,
        ...action.payload,
      };
    },
    clearEmployeeFormData: (state) => {
      state.addEmployeeForm = {};
    },
    getEmpAssetRequest: (state) => {
      state.isLoading = true;
    },
    getEmpAssetRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.assets = action.payload;
    },
    getEmpAssetRequestFailed: (state) => {
      state.isLoading = false;
    },
    addEmpAsset: (state, action) => {
      const tempAssets = state.assets;
      tempAssets.push(action.payload);
      state.assets = tempAssets;
    },
    getAttendanceRequest: (state) => {
      state.isLoading = true;
    },
    getAttendanceRequestSuccess: (state, action) => {
      state.attendance = action.payload;
      state.isLoading = false;
    },
    getAttendanceRequestFailed: (state) => {
      state.isLoading = false;
    },
    getCurrentEmpData: (state) => {
      state.isLoading = true;
    },
    getCurrentEmpDataSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.isLoading = false;
    },
    getCurrentEmpDataFailed: (state) => {
      state.isLoading = false;
    },
    deleteCurrentEmpData: (state) => {
      state.isLoading = true;
    },
    deleteCurrentEmpDataSuccess: (state, action) => {
      const tempData = state?.data?.filter((el) => el.id !== action.payload);
      state.data = tempData;
      state.isLoading = false;
    },
    deleteCurrentEmpDataFailed: (state) => {
      state.isLoading = false;
    },
    getHrEmpTime: (state, action) => {
      state.timeAndLeaves.time = action.payload;
      state.isLoading = false;
    },
    getHrEmpLeaves: (state, action) => {
      state.timeAndLeaves.leaves = action.payload;
      state.isLoading = false;
    },
    updateEmpTimeRequest: (state) => {
      state.isLoading = true;
    },
    updateEmpTime: (state, action) => {
      state.timeAndLeaves.time = action.payload;
      state.isLoading = false;
    },
    updateEmpLeavesRequest: (state) => {
      state.isLoading = true;
    },
    updateEmpLeaves: (state, action) => {
      state.timeAndLeaves.leaves = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getEmpData,
  getEmpDataSuccess,
  getEmpDataFailed,
  addEmployeeFormData,
  getEmpAssetRequest,
  getEmpAssetRequestSuccess,
  getEmpAssetRequestFailed,
  addEmpAsset,
  getAttendanceRequest,
  getAttendanceRequestSuccess,
  getAttendanceRequestFailed,
  getCurrentEmpData,
  getCurrentEmpDataSuccess,
  getCurrentEmpDataFailed,
  deleteCurrentEmpData,
  deleteCurrentEmpDataSuccess,
  deleteCurrentEmpDataFailed,
  getHrEmpTime,
  getHrEmpLeaves,
  clearEmployeeFormData,
  updateEmpTimeRequest,
  updateEmpTime,
  updateEmpLeavesRequest,
  updateEmpLeaves,
} = employeeSlice.actions;
export default employeeSlice.reducer;
