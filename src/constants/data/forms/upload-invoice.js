export const uploadInvoiceForm = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee ID',
    name: 'employee_id',
  },
  {
    title: 'Invoice date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'invoice_date',
  },
  {
    title: 'Due date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'due_date',
  },
  {
    title: 'Currency',
    placeholder: 'Select currency',
    name: 'currency',
    type: 'select',
    options: [
      {
        label: '$ U.S. dollar',
      },
      {
        label: '€ Euro',
      },
      {
        label: '¥ Japanese yen',
      },
      {
        label: '£ Sterling',
      },
      {
        label: 'Renminbi',
      },
      {
        label: 'Australian dollar',
      },
      {
        label: 'Canadian dollar',
      },
      {
        label: 'Swiss franc',
      },
      {
        label: 'SAR',
      },
      {
        label: 'PKR',
      },
      {
        label: 'INR',
      },
    ],
  },
  {
    title: 'Invoice amount',
    placeholder: 'Enter amount',
    name: 'invoice_amount',
    type: 'number',
  },

  {
    title: 'Upload',
    placeholder: 'Upload invoice',
    prefixIcon: 'upload',
    type: 'file',
    name: 'invoice',
    accept: '.pdf',
    filelabel: 'Accept .pdf file only',
  },
];

export const editUploadInvoiceForm = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee ID',
    name: 'employee_id',
    disabled: true,
  },
  {
    title: 'Invoice date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'invoice_date',
  },
  {
    title: 'Due date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'due_date',
  },
  {
    title: 'Currency',
    placeholder: 'Select currency',
    name: 'currency',
    type: 'select',
    options: [
      {
        label: '$ U.S. dollar',
      },
      {
        label: '€ Euro',
      },
      {
        label: '¥ Japanese yen',
      },
      {
        label: '£ Sterling',
      },
      {
        label: 'Renminbi',
      },
      {
        label: 'Autralian dollar',
      },
      {
        label: 'Canadian dollar',
      },
      {
        label: 'Swiss franc',
      },
      {
        label: 'SAR',
      },
      {
        label: 'PKR',
      },
      {
        label: 'INR',
      },
    ],
  },
  {
    title: 'Invoice amount',
    placeholder: 'Enter amount',
    name: 'invoice_amount',
    type: 'number',
  },

  {
    title: 'Upload',
    placeholder: 'Upload invoice',
    prefixIcon: 'upload',
    type: 'file',
    name: 'invoice',
    accept: '.pdf',
    filelabel: 'Accept .pdf file only',
  },
];

export const uploadOtherInvoiceForm = [
  {
    title: 'Invoice reference',
    placeholder: 'Invoice Reference',
    name: 'invoice_reference',
  },
  {
    title: 'Invoice date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'invoice_date',
  },
  {
    title: 'Due date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'due_date',
  },
  {
    title: 'Currency',
    placeholder: 'Select currency',
    name: 'currency',
    type: 'select',
    options: [
      {
        label: '$ U.S. dollar',
      },
      {
        label: '€ Euro',
      },
      {
        label: '¥ Japanese yen',
      },
      {
        label: '£ Sterling',
      },
      {
        label: 'Renminbi',
      },
      {
        label: 'Australian dollar',
      },
      {
        label: 'Canadian dollar',
      },
      {
        label: 'Swiss franc',
      },
      {
        label: 'SAR',
      },
      {
        label: 'PKR',
      },
      {
        label: 'INR',
      },
    ],
  },
  {
    title: 'Invoice amount',
    placeholder: 'Enter amount',
    name: 'invoice_amount',
    type: 'number',
  },
  {
    title: 'Upload',
    placeholder: 'Upload invoice',
    prefixIcon: 'upload',
    type: 'file',
    name: 'invoice',
    accept: '.pdf',
    filelabel: 'Accept .pdf file only',
  },
];
