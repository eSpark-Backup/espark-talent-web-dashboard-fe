import { createSlice } from '@reduxjs/toolkit';

const policySlice = createSlice({
  name: 'policySlice',
  initialState: {
    policies: [],
  },
  reducers: {
    getPolicyData: (state, action) => {
      state.policies = action.payload;
    },
  },
});

export const { getPolicyData } = policySlice.actions;
export default policySlice.reducer;
