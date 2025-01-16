import * as Yup from 'yup';
import { dojValidation, nameValidation } from './validations';

export const addOnboardFormSchema = Yup.object({
  employee_name: nameValidation,
  gender: Yup.string().required('Gender is required'),
  job_title: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters long')
    .max(30, 'Job title cannot exceed 30 characters'),
  role_type: Yup.string().required('Role type is Required'),
  employment_term: Yup.string().required('Employement term is required'),
  joining_date: dojValidation,
  country: Yup.object().required('Country is required'),
  notice_period: Yup.number()
    .required('Notice period is required')
    .min(1, 'Notice period must be at least 1 day')
    .max(365, 'Notice period cannot exceed 365 days'),
  salary: Yup.string()
    .required('Salary is required')
    .min(3, 'Job title must be at least 3 characters long'),
  salary_currency: Yup.string().required('Currency is required'),
});
