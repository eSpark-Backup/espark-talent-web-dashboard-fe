import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState: {
    clients: [],
    currentClient: {},
    addClientForm: {},
  },
  reducers: {
    getClientsData: (state, action) => {
      state.clients = action.payload;
    },
    getCurrentClientData: (state) => {
      state.isLoading = true;
    },
    getCurrentClientDataSuccess: (state, action) => {
      state.currentClient = action.payload;
      state.isLoading = false;
    },
    getCurrentClientDataFailed: (state) => {
      state.isLoading = false;
    },
    addClientFormData: (state, action) => {
      state.addClientForm = {
        ...state.addClientForm,
        ...action.payload,
      };
    },
  },
});

export const {
  getClientsData,
  getCurrentClientData,
  getCurrentClientDataSuccess,
  getCurrentClientDataFailed,
  addClientFormData,
} = clientSlice.actions;
export default clientSlice.reducer;
