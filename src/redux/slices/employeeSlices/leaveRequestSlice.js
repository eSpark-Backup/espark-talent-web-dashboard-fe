import { createSlice } from '@reduxjs/toolkit';

const leaveRequestSlice = createSlice({
  name: 'leaveRequestSlice',
  initialState: {
    data: {},
  },
  reducers: {
    getEmpLeaveRequestData: (state, action) => {
      state.data = { ...action.payload };
    },
  },
});

export const { getEmpLeaveRequestData } = leaveRequestSlice.actions;
export default leaveRequestSlice.reducer;
