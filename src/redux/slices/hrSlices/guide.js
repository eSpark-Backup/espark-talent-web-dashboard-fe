import { createSlice } from '@reduxjs/toolkit';

const guideSlice = createSlice({
  name: 'guideSlice',
  initialState: {
    guides: [],
  },
  reducers: {
    getGuideData: (state, action) => {
      state.guides = action?.payload;
    },
    removeGuide: (state, action) => {
      const tempData = state?.guides?.filter((el) => el.id !== action?.payload);
      state.guides = tempData;
    },
    addGuide: (state, action) => {
      state.guides = [...state.guides, action?.payload];
    },
    updateGuideValue: (state, action) => {
      const guideIndex = state.guides.findIndex(
        (el) => el.id === action?.payload.id
      );
      state.guides[guideIndex][action?.payload.key] = [
        'DisabledCheck',
        'EnabledCheck',
        action?.payload?.value,
      ];
    },
  },
});

export const { getGuideData, updateGuideValue, addGuide, removeGuide } =
  guideSlice.actions;
export default guideSlice.reducer;
