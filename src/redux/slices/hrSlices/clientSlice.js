import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState: {
    clients: [],
  },
  reducers: {
    getClientsData: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const { getClientsData } = clientSlice.actions;
export default clientSlice.reducer;
