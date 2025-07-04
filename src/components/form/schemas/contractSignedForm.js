import * as Yup from 'yup';
import { nameRegExp } from './validations';

export const contractFormSchema = Yup.object({
  contract_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  client_id: Yup.string()
    .required('Client id is equired')
    .min(1, 'Client id must be at least 1 characters long')
    .max(255, 'Client id cannot exceed 255 characters'),
  contract_doc: Yup.mixed()
    .required('Contract doc is required')
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
  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const editContractFormSchema = Yup.object({
  contract_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  contract_doc: Yup.mixed()
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
  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const contractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  employee_id: Yup.string()
    .required('Employee id is required')
    .min(1, 'Employee id must be at least 1 characters long')
    .max(255, 'Employee id cannot exceed 255 characters'),
  contract_doc: Yup.mixed()
    .required('Contract doc is required')
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
  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const editContractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  contract_doc: Yup.mixed()
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
  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const OffShContractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  employee_id: Yup.string()
    .required('Employee id is required')
    .min(1, 'Employee id must be at least 1 characters long')
    .max(255, 'Employee id cannot exceed 255 characters'),
  client_id: Yup.string()
    .required('Client id is required')
    .min(1, 'client id must be at least 1 characters long')
    .max(255, 'client id cannot exceed 255 characters'),
  contract_doc: Yup.mixed()
    .required('Contract doc is required')
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
  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const editOffShContractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  contract_doc: Yup.mixed()
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
  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});
