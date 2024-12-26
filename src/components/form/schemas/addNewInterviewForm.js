import * as Yup from 'yup';
import { nameValidation } from './validations';

export const addNewInterviewFormSchema = Yup.object({
  employee_name: nameValidation,
  gender: Yup.string().required('Gender is required'),
  job_title: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters long') // Minimum length
    .max(30, 'Job title cannot exceed 30 characters'), // Maximum length
  role_type: Yup.string().required('Role Type is required'),
  employment_term: Yup.string().required('Employement term is required'),
  interview_date_time: Yup.string().required('Interview date & time required'),
  country: Yup.object().required('Country is required'),
});
