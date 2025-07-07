import * as Yup from 'yup';
import { emailValidation } from './validations';

export const letterFormSchema = Yup.object({
  objective: Yup.string()
    .required('Objective is required')
    .transform((value) => value.trim())
    .min(2, 'Objective is too short - should be 2 chars minimum.')
    .max(255, 'Objective is too long - should be 255 chars maximum.'),
  email: emailValidation,
  issue_date: Yup.date().required('Date is required'),
  reason: Yup.string()
    .required('Reason is required')
    .transform((value) => value.trim())
    .min(2, 'Reason is too short - should be 2 chars minimum.')
    .max(255, 'Reason is too long - should be 255 chars maximum.'),
  letter: Yup.mixed()
    .required('File is required')
    .test(
      'fileFormat',
      'Unsupported file format (only PDF allowed)',
      (value) =>
        value &&
        [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]?.includes(value?.type)
    )
    .test(
      'fileNameLength',
      'File name should not exceed 100 characters',
      (value) => value && value?.name?.length <= 100
    )
    .test(
      'fileSize',
      'File size should not exceed 5MB',
      (value) => value && value?.size <= 5 * 1024 * 1024 // <= 5MB
    ),
});

export const letterEditFormSchema = Yup.object({
  objective: Yup.string()
    .required('Objective is required')
    .transform((value) => value.trim())
    .min(2, 'Objective is too short - should be 2 chars minimum.')
    .max(255, 'Objective is too long - should be 255 chars maximum.'),
  email: emailValidation,
  issue_date: Yup.date().required('Date is required'),
  reason: Yup.string()
    .transform((value) => value.trim())
    .min(2, 'Reason is too short - should be 2 chars minimum.')
    .max(255, 'Reason is too long - should be 255 chars maximum.'),
  letter: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      'fileFormat',
      'Unsupported file format (only PDF allowed)',
      (value) =>
        !value ||
        [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]?.includes(value?.type)
    )
    .test(
      'fileNameLength',
      'File name should not exceed 100 characters',
      (value) => !value || value?.name?.length <= 100
    )
    .test(
      'fileSize',
      'File size should not exceed 5MB',
      (value) => !value || value?.size <= 5 * 1024 * 1024
    ),
});
