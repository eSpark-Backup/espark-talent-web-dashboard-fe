import * as Yup from 'yup';
import { nameValidation } from './validations';

export const uploadGuideFormSchema = Yup.object({
  guide: nameValidation,
  language: Yup.string()
    .required('Language is required')
    .min(3, 'Language must be at least 3 characters long')
    .max(30, 'Language cannot exceed 30 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters long')
    .max(30, 'Description cannot exceed 30 characters'),
  guide_doc: Yup.mixed()
    .required('Guide doc is required')
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

export const editGuideFormSchema = Yup.object({
  guide: Yup.string().required('Policy name is required'),
  language: Yup.string()
    .required('Language is required')
    .min(3, 'Language must be at least 3 characters long')
    .max(30, 'Language cannot exceed 30 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters long')
    .max(30, 'Description cannot exceed 30 characters'),
  guide_doc: Yup.mixed()
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
