import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: {
    companySettings: {},
    accounts: [],
    rolesDetails: [],
    isLoadingRoleDetails: false,
  },
  reducers: {
    getCompSettingsData: (state, action) => {
      state.companySettings = action.payload;
    },
    getAccountsData: (state, action) => {
      state.accounts = action.payload;
    },
    getRolesDetailsRequest: (state) => {
      state.isLoadingRoleDetails = true;
    },
    getRolesDetailsSuccess: (state, action) => {
      state.rolesDetails = action.payload;
      state.isLoadingRoleDetails = false;
    },
  },
});

export const {
  getCompSettingsData,
  getAccountsData,
  getRolesDetailsSuccess,
  getRolesDetailsRequest,
} = settingsSlice.actions;
export default settingsSlice.reducer;
