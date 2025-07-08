import { createSlice } from '@reduxjs/toolkit';

const benefitSlice = createSlice({
  name: 'benefitSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchEmpBenefits: (state) => {
      state.isLoading = true;
    },
    fetchEmpBenefitsFailed: (state) => {
      state.isLoading = false;
    },
    fetchEmpBenefitsSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  },
});

export const {
  fetchEmpBenefits,
  fetchEmpBenefitsFailed,
  fetchEmpBenefitsSuccess,
} = benefitSlice.actions;

export default benefitSlice.reducer;
