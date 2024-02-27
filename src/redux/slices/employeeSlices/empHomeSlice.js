import { createSlice } from '@reduxjs/toolkit';

const empHomeSlice = createSlice({
  name: 'empHomeSlice',
  initialState: {
    homeData: {},
  },
  reducers: {
    getEmpHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    marKCheckin: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          break: action.check_in,
        },
      };
    },
    markBreak: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          break: action.payload,
        },
      };
    },
    markResume: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          resume: action.payload,
        },
      };
    },
    markCheckout: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          check_out: action.payload,
        },
      };
    },
  },
});

export const {
  getEmpHomeData,
  markBreak,
  markResume,
  markCheckout,
  marKCheckin,
} = empHomeSlice.actions;
export default empHomeSlice.reducer;
