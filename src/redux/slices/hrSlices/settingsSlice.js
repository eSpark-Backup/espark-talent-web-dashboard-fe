import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: {
    companySettings: {},
    accounts: [],
  },
  reducers: {
    getCompSettingsData: (state, action) => {
      state.companySettings = action.payload;
    },
    getAccountsData: (state, action) => {
      state.accounts = action.payload;
    },
  },
});

export const { getCompSettingsData, getAccountsData } = settingsSlice.actions;
export default settingsSlice.reducer;
