import * as Yup from 'yup';
import { dojValidation } from './validations';

export const addEmployeModalFormSchema = Yup.object({
  salary: Yup.number().required('Salary is required'),
  salary_currency: Yup.string().required('Currency is required'),
  job_title: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters long') // Minimum length
    .max(30, 'Job title cannot exceed 30 characters'), // Maximum length
  role_type: Yup.string().required('Role type is required'),
  employment_term: Yup.string().required('Employement term is required'),
  joining_date: dojValidation,
  country: Yup.object().required('Country is required'),
});
