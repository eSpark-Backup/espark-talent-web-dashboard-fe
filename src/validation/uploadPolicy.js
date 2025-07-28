import * as Yup from 'yup';
import { nameRegExp } from '@/src/validation/validations';

export const uploadPolicyFormSchema = Yup.object({
  policy_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Policy name is required')
    .min(2, 'Policy name is too short - should be 2 chars minimum.')
    .max(255, 'Policy name is too long - should be 255 chars maximum.'),
  policy_doc: Yup.mixed()
    .required('Policy doc is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return value && value.type === 'application/pdf';
    })
    .test(
      'fileSize',
      'File size should not exceed 5MB',
      (value) => value && value.size <= 5 * 1024 * 1024
    )
    .test(
      'fileNameLength',
      'File name should not exceed 100 characters',
      (value) => value && value.name.length <= 100
    ),
});

export const editUploadPolicyFormSchema = Yup.object({
  policy_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Policy name is required')
    .min(2, 'Policy name is too short - should be 2 chars minimum.')
    .max(255, 'Policy name is too long - should be 255 chars maximum.'),
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
