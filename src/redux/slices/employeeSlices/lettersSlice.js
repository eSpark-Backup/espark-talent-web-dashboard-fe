import { createSlice } from '@reduxjs/toolkit';

const lettersSlice = createSlice({
  name: 'lettersSlice',
  initialState: {
    letters: [],
    isLoading: false,
  },
  reducers: {
    fetchEmpLetters: (state) => {
      state.isLoading = true;
    },
    fetchEmpLettersFailed: (state) => {
      state.isLoading = false;
    },
    fetchEmpLettersSuccess: (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
    },
  },
});

export const {
  fetchEmpLetters,
  fetchEmpLettersFailed,
  fetchEmpLettersSuccess,
} = lettersSlice.actions;
export default lettersSlice.reducer;
