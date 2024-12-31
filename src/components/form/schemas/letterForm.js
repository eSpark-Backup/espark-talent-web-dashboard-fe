import * as Yup from 'yup';
import { emailValidation } from './validations';

export const letterFormSchema = Yup.object({
  objective: Yup.string().required('Letter is required'),
  email: emailValidation,
  issue_date: Yup.date().required('Date is required'),
  reason: Yup.string(),
  letter: Yup.mixed()
    .required('File is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      if (!value) return false;
      return value.type === 'application/pdf';
    }),
});

export const letterEditFormSchema = Yup.object({
  objective: Yup.string().required('Letter is required'),
  email: emailValidation,
  issue_date: Yup.date().required('Date is required'),
  reason: Yup.string(),
});
