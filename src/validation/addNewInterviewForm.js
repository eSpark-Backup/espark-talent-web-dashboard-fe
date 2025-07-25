import * as Yup from 'yup';
import { jobTitleRegExp, nameValidation } from './validations';

export const addNewInterviewFormSchema = Yup.object({
  employee_name: nameValidation,
  gender: Yup.string()
    .required('Gender is required')
    .min(2, 'Gender  must be at least 2 characters long')
    .max(255, 'Gender cannot exceed 255 characters'),
  job_title: Yup.string()
    .transform((value) => value.trim())
    .matches(jobTitleRegExp, 'Job title is not valid')
    .required('Job title is required')
    .min(2, 'Job title is too short - should be 2 chars minimum.')
    .max(255, 'Job title is too long - should be 100 chars maximum.'),
  role_type: Yup.string()
    .required('Role Type is required')
    .min(2, 'Role Type must be at least 2 characters long')
    .max(255, 'Role Type cannot exceed 255 characters'),
  employment_term: Yup.string()
    .required('Employement term is required')
    .min(2, 'Employement term must be at least 2 characters long')
    .max(255, 'Employement term cannot exceed 255 characters'),
  interview_date_time: Yup.date().required('Interview date & time required'),
  country: Yup.object().required('Country is required'),
});
