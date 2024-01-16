import * as Yup from 'yup';

export const uploadInvoiceFormSchema = Yup.object({
    employeeName: Yup.string().required('Required'),
    invoiceDate: Yup.string().required('Required'),
    dueDate: Yup.string().required('Required'),
    invoiceAmount: Yup.string().required('Required'),
    upload: Yup.mixed().required('Required'),
});