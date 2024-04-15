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
    addPolicy: (state, action) => {
      console.log({ paylaod: action.payload });
      state.policies = [...state.policies, action.payload];
    },
    updatePolicyValue: (state, action) => {
      const policyIndex = state.policies.findIndex(
        (el) => el.id === action.payload.id
      );
      state.policies[policyIndex][action.payload.key] = [
        'DisabledCheck',
        'EnabledCheck',
        action.payload.value,
      ];
    },
  },
});

export const { getPolicyData, updatePolicyValue, addPolicy } =
  policySlice.actions;
export default policySlice.reducer;
