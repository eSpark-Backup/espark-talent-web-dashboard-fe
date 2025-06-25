import { createSlice } from '@reduxjs/toolkit';

const candidateSlice = createSlice({
  name: 'candidateSlice',
  initialState: {
    candidates: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // === GET ===
    getCandidatesRequest: (state) => {
      state.isLoading = true;
    },
    getCandidatesSuccess: (state, action) => {
      state.candidates = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getCandidatesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // === POST ===
    postCandidatesRequest: (state) => {
      state.isLoading = true;
    },
    postCandidatesSuccess: (state, action) => {
      state.candidates.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    postCandidatesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // === PUT ===
    putCandidatesRequest: (state) => {
      state.isLoading = true;
    },
    putCandidatesSuccess: (state, action) => {
      const updated = action.payload;
      const index = state.candidates.findIndex((c) => c.id === updated.id);
      if (index !== -1) {
        state.candidates[index] = updated;
      }
      state.isLoading = false;
      state.error = null;
    },
    putCandidatesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // === DELETE ===
    deleteCandidatesRequest: (state) => {
      state.isLoading = true;
    },
    deleteCandidatesSuccess: (state, action) => {
      const id = action.payload;
      state.candidates = state.candidates.filter((c) => c.id !== id);
      state.isLoading = false;
      state.error = null;
    },
    deleteCandidatesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // === UTILITY ===
    clearCandidateError: (state) => {
      state.error = null;
    },
    clearCandidateList: (state) => {
      state.candidates = [];
    },
  },
});

export const {
  getCandidatesRequest,
  getCandidatesSuccess,
  getCandidatesFailure,

  postCandidatesRequest,
  postCandidatesSuccess,
  postCandidatesFailure,

  putCandidatesRequest,
  putCandidatesSuccess,
  putCandidatesFailure,

  deleteCandidatesRequest,
  deleteCandidatesSuccess,
  deleteCandidatesFailure,

  clearCandidateError,
  clearCandidateList,
} = candidateSlice.actions;

export default candidateSlice.reducer;
