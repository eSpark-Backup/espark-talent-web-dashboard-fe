import { createSlice } from '@reduxjs/toolkit';

const teamMemberSlice = createSlice({
    name: 'teamMemberSlice',
    initialState: {
        data: {},
        isLoading: false,
    },
    reducers: {
        fetchTeamMembersRequest: (state) => {
            state.isLoading = true;
        },
        fetchTeamMembersRequestSuccess: (state, action) => {
            state.data = action?.payload;
            state.isLoading = false;
        },
        fetchTeamMembersRequestFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    fetchTeamMembersRequest,
    fetchTeamMembersRequestSuccess,
    fetchTeamMembersRequestFailed,
} = teamMemberSlice.actions;
export default teamMemberSlice.reducer;
