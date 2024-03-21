import * as Yup from 'yup';

export const uploadInvoiceFormSchema = Yup.object({
  employee_id: Yup.string().required('Required'),
  invoice_date: Yup.string().required('Required'),
  due_date: Yup.string().required('Required'),
  invoice_amount: Yup.string().required('Required'),
  invoice: Yup.mixed().required('Required'),
  payment_status: Yup.string().required('Required'),
});
export const uploadOthInvoiceFormSchema = Yup.object({
  invoice_reference: Yup.string().required('Required'),
  invoice_date: Yup.string().required('Required'),
  due_date: Yup.string().required('Required'),
  invoice_amount: Yup.string().required('Required'),
  invoice: Yup.mixed().required('Required'),
  payment_status: Yup.string().required('Required'),
});
