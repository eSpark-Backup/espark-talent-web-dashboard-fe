import * as Yup from 'yup';
import { dojValidation, jobTitleRegExp, nameValidation } from './validations';

const addOnboardFormSchema = Yup.object({
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
    .required('Role type is required')
    .min(2, 'role type must be at least 2 characters long')
    .max(255, 'role type cannot exceed 255 characters'),
  employment_term: Yup.string()
    .required('Employement term is required')
    .min(2, 'Employement term must be at least 2 characters long')
    .max(255, 'Employement term cannot exceed 255 characters'),
  joining_date: dojValidation,
  country: Yup.object().required('Country is required'),
  notice_period: Yup.number()
    .required('Notice period is required')
    .min(1, 'Notice period must be at least 1 day')
    .max(365, 'Notice period cannot exceed 365 days'),
  salary: Yup.number().required('Salary is required'),
  salary_currency: Yup.string()
    .required('currency is required')
    .min(2, 'currency must be at least 2 characters long')
    .max(255, 'currency cannot exceed 255 characters'),
});

export { addOnboardFormSchema };
