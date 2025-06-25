import { createSlice } from '@reduxjs/toolkit';

const CandidateSlice = createSlice({
  name: 'CandidateSlice',
  initialState: {
    data: {
      active: [],
      onBoard: [],
      terminated: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchCandidatesRequest: (state) => {
      state.isLoading = true;
    },
    fetchCandidatesRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchCandidatesRequest, fetchCandidatesRequestFailed } =
  CandidateSlice.actions;
export default CandidateSlice.reducer;
