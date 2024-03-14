import { createSlice } from '@reduxjs/toolkit';

const invoiceTrackingSlice = createSlice({
  name: 'invoiceTrackingSlice',
  initialState: {
    data: {
      pending: [],
      processing: [],
      paid: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchPendingInvoicePaymentsRequest: (state) => {
      state.isLoading = true;
    },
    fetchPendingInvoicePaymentsRequestSuccess: (state, action) => {
      state.data.pending = action?.payload;
      state.isLoading = false;
    },
    fetchPendingInvoicePaymentsRequestFailed: (state) => {
      state.isLoading = false;
    },
    fetchProcessingInvoicePaymentsRequest: (state) => {
      state.isLoading = true;
    },
    fetchProcessingInvoicePaymentsRequestSuccess: (state, action) => {
      state.data.pending = action?.payload;
      state.isLoading = false;
    },
    fetchProcessingInvoicePaymentsRequestFailed: (state) => {
      state.isLoading = false;
    },
    fetchPaidInvoicePaymentsRequest: (state) => {
      state.isLoading = true;
    },
    fetchPaidInvoicePaymentsRequestSuccess: (state, action) => {
      state.data.paid = action?.payload;
      state.isLoading = false;
    },
    fetchPaidInvoicePaymentsRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchPendingInvoicePaymentsRequest,
  fetchPendingInvoicePaymentsRequestSuccess,
  fetchPendingInvoicePaymentsRequestFailed,
  fetchProcessingInvoicePaymentsRequest,
  fetchProcessingInvoicePaymentsRequestSuccess,
  fetchProcessingInvoicePaymentsRequestFailed,
  fetchPaidInvoicePaymentsRequest,
  fetchPaidInvoicePaymentsRequestSuccess,
  fetchPaidInvoicePaymentsRequestFailed,
} = invoiceTrackingSlice.actions;
export default invoiceTrackingSlice.reducer;
