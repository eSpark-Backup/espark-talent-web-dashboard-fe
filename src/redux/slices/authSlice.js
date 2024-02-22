import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    userData: {},
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
