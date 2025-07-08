import * as Yup from 'yup';
import { dojValidation, jobTitleRegExp } from './validations';

export const addEmployeModalFormSchema = Yup.object({
  salary: Yup.number()
    .required('Salary is required')
    .min(1, 'Salary must be at least 1 characters long'),
  salary_currency: Yup.string().required('Currency is required'),
  job_title: Yup.string()
    .transform((value) => value.trim())
    .matches(jobTitleRegExp, 'Job title is not valid')
    .required('Job title is required')
    .min(2, 'Job title is too short - should be 2 chars minimum.')
    .max(255, 'Job title is too long - should be 100 chars maximum.'),
  role_type: Yup.string()
    .required('Role type is required')
    .min(2, 'role type must be at least 2 characters long')
    .max(255, 'role type cannot exceed 255 characters'),
  employment_term: Yup.string().required('Employement term is required'),
  joining_date: dojValidation,
  country: Yup.object().required('Country is required'),
});
