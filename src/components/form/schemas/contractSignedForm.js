import * as Yup from 'yup';
import { nameRegExp } from './validations';

export const contractFormSchema = Yup.object({
  contract_name: Yup.string().required('Contract name is required'),
  client_id: Yup.string().required('Client id is equired'),
  date: Yup.string().required('Date is required'),
  contract_doc: Yup.mixed().required('Contract doc is required'),
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
});

export const contractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string().required('Contract name is required'),
  employee_id: Yup.string().required('Employee id is required'),
  date: Yup.string().required('Date is required'),
  contract_doc: Yup.mixed().required('Contract doc is required'),
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
});

export const OffShContractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string().required('Contract name is required'),
  employee_id: Yup.string().required('Employee id is required'),
  client_id: Yup.string().required('Client id is required'),
  date: Yup.string().required('Date is required'),
  contract_doc: Yup.mixed().required('Contract doc is required'),
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
});
