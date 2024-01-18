export const uploadInvoiceForm = [
  {
    title: 'Employee name',
    placeholder: 'Enter name',
    name: 'employeeName',
  },
  {
    title: 'Invoice date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'invoiceDate',
  },
  {
    title: 'Due date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'dueDate',
  },
  {
    title: 'Invoice amount',
    placeholder: '',
    name: 'invoiceAmount',
    prefixIcon: '$',
  },
  {
    title: 'Upload',
    placeholder: 'Upload invoice',
    prefixIcon: 'upload',
    type: 'file',
    name: 'upload',
  },
];
