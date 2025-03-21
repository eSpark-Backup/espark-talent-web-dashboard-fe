import * as Yup from 'yup';

export const uploadInvoiceFormSchema = Yup.object({
  employee_id: Yup.string().required('Employee id is is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  due_date: Yup.string()
    .required('Due date is required')
    .test(
      'is-greater',
      'Due date must be greater than invoice date',
      function (dueDate) {
        const { invoice_date: invoiceDate } = this.parent;
        if (!invoiceDate || !dueDate) return true;
        return new Date(dueDate) >= new Date(invoiceDate);
      }
    ),
  invoice_amount: Yup.string().required('Invoice amount is required'),
  invoice: Yup.mixed()
    .required('Invoice is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return value && value.type === 'application/pdf';
    }),
  currency: Yup.string().required('Currency is required'),
});

export const EditInvoiceFormSchema = Yup.object({
  employee_id: Yup.string().required('Employee id is is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  due_date: Yup.string()
    .required('Due date is required')
    .test(
      'is-greater',
      'Due date must be greater than invoice date',
      function (dueDate) {
        const { invoice_date: invoiceDate } = this.parent;
        if (!invoiceDate || !dueDate) return true;
        return new Date(dueDate) >= new Date(invoiceDate);
      }
    ),
  invoice_amount: Yup.string().required('Invoice amount is required'),
  invoice: Yup.mixed()
    .nullable()
    .test('fileType', 'Only PDF files are allowed', (value) => {
      if (!value) return true;
      return value.type === 'application/pdf';
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // ✅ Convert 5MB to bytes
    })
    .test(
      'fileNameLength',
      'File name must be at most 100 characters',
      (value) => {
        if (!value) return true;
        return value.name.length <= 100;
      }
    ),
  currency: Yup.string().required('Currency is required'),
});

export const uploadOthInvoiceFormSchema = Yup.object({
  invoice_reference: Yup.string().required('Invoice reference is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  due_date: Yup.string()
    .required('Due date is required')
    .test(
      'is-greater',
      'Due date must be greater than invoice date',
      function (dueDate) {
        const { invoice_date: invoiceDate } = this.parent;
        if (!invoiceDate || !dueDate) return true;
        return new Date(dueDate) >= new Date(invoiceDate);
      }
    ),
  invoice_amount: Yup.string().required('Invoice amount is required'),
  invoice: Yup.mixed()
    .required('Invoice is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return value && value.type === 'application/pdf';
    }),
  currency: Yup.string().required('Currency is required'),
});

export const editOthInvoiceFormSchema = Yup.object({
  invoice_reference: Yup.string().required('Invoice reference is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  due_date: Yup.string()
    .required('Due date is required')
    .test(
      'is-greater',
      'Due date must be greater than invoice date',
      function (dueDate) {
        const { invoice_date: invoiceDate } = this.parent;
        if (!invoiceDate || !dueDate) return true;
        return new Date(dueDate) >= new Date(invoiceDate);
      }
    ),
  invoice_amount: Yup.string().required('Invoice amount is required'),
  invoice: Yup.mixed()
    .nullable()
    .test('fileType', 'Only PDF files are allowed', (value) => {
      if (!value) return true;
      return value.type === 'application/pdf';
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // ✅ Convert 5MB to bytes
    })
    .test(
      'fileNameLength',
      'File name must be at most 100 characters',
      (value) => {
        if (!value) return true;
        return value.name.length <= 100;
      }
    ),
  currency: Yup.string().required('Currency is required'),
});
