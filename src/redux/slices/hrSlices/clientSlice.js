import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState: {
    clients: [],
    currentClient: {},
    addClientForm: {},
    currentClientData: {
      hireAndOnBoard: {
        hiringRequest: [],
        interviewSchedule: [],
        onBoarding: [],
      },
      employees: {
        all: [],
        activeEmployees: [],
        terminatedEmployees: [],
      },
      employeeInvoices: {
        pending: [],
        processing: [],
        paid: [],
      },
      otherInvoices: {
        pending: [],
        processing: [],
        paid: [],
      },
    },
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
    getClientHiringRequest: (state, action) => {
      state.currentClientData.hireAndOnBoard.hiringRequest = action.payload;
    },
    getClientInterviewSchedule: (state, action) => {
      state.currentClientData.hireAndOnBoard.interviewSchedule = action.payload;
    },
    getClientOnboarding: (state, action) => {
      state.currentClientData.hireAndOnBoard.onBoarding = action.payload;
    },
    getClientEmpInvoicePending: (state, action) => {
      state.currentClientData.employeeInvoices.pending = action.payload;
    },
    getClientEmpInvoiceProcessing: (state, action) => {
      state.currentClientData.employeeInvoices.processing = action.payload;
    },
    getClientEmpInvoicePaid: (state, action) => {
      state.currentClientData.employeeInvoices.paid = action.payload;
    },
    getClientOthInvoicePending: (state, action) => {
      state.currentClientData.otherInvoices.pending = action.payload;
    },
    getClientOthInvoiceProcessing: (state, action) => {
      state.currentClientData.otherInvoices.processing = action.payload;
    },
    getClientOthInvoicePaid: (state, action) => {
      state.currentClientData.otherInvoices.paid = action.payload;
    },
  },
});

export const {
  getClientsData,
  getCurrentClientData,
  getCurrentClientDataSuccess,
  getCurrentClientDataFailed,
  addClientFormData,
  getClientHiringRequest,
  getClientInterviewSchedule,
  getClientOnboarding,
  getClientEmpInvoicePending,
  getClientEmpInvoiceProcessing,
  getClientEmpInvoicePaid,
  getClientOthInvoicePending,
  getClientOthInvoiceProcessing,
  getClientOthInvoicePaid,
} = clientSlice.actions;
export default clientSlice.reducer;
