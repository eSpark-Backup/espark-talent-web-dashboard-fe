import * as Yup from 'yup';
import { nameValidation } from './validations';

export const uploadPolicyFormSchema = Yup.object({
  policy_name: nameValidation,
  policy_doc: Yup.mixed()
    .required('Policy doc is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return value && value.type === 'application/pdf';
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    })
    .test(
      'fileNameLength',
      'File name must be at most 100 characters',
      (value) => {
        return value && value.name.length <= 100;
      }
    ),
});

export const editUploadPolicyFormSchema = Yup.object({
  policy_name: Yup.string().required('Policy name is required'),
  policy_doc: Yup.mixed()
    .nullable()
    .test('fileType', 'Only PDF files are allowed', (value) => {
      if (!value) return true;
      return value.type === 'application/pdf';
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test(
      'fileNameLength',
      'File name must be at most 100 characters',
      (value) => {
        if (!value) return true;
        return value.name.length <= 100;
      }
    ),
});
