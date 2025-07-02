import { createSlice } from '@reduxjs/toolkit';

const teamMemberSlice = createSlice({
  name: 'teamMemberSlice',
  initialState: {
    data: {
      active: [],
      onBoard: [],
      terminated: [],
      selectedMember: null, // Add this
    },
    isLoading: false,
  },
  reducers: {
    fetchTeamMemberByIdRequest: (state) => {
      state.isLoading = true;
      state.selectedMember = null;
    },
    fetchTeamMemberByIdSuccess: (state, action) => {
      state.selectedMember = action.payload;
      state.isLoading = false;
    },
    fetchTeamMemberByIdFailed: (state) => {
      state.isLoading = false;
      state.selectedMember = null;
    },
    fetchTeamMembersRequest: (state) => {
      state.isLoading = true;
    },
    fetchTeamMembersRequestActiveSuccess: (state, action) => {
      state.data.active = action?.payload;
      state.isLoading = false;
    },
    fetchTeamMembersRequestTerminatedSuccess: (state, action) => {
      state.data.terminated = action?.payload;
      state.isLoading = false;
    },
    fetchTeamMembersRequestOnBoardSuccess: (state, action) => {
      state.data.onBoard = action?.payload;
      state.isLoading = false;
    },
    fetchTeamMembersRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchTeamMemberByIdRequest,
  fetchTeamMemberByIdSuccess,
  fetchTeamMemberByIdFailed,
  fetchTeamMembersRequest,
  fetchTeamMembersRequestActiveSuccess,
  fetchTeamMembersRequestFailed,
  fetchTeamMembersRequestOnBoardSuccess,
  fetchTeamMembersRequestTerminatedSuccess,
} = teamMemberSlice.actions;
export default teamMemberSlice.reducer;
