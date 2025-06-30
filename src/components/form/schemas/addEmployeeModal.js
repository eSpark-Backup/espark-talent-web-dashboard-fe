import * as Yup from 'yup';
import {
  dojValidation,
  emailValidation,
  jobTitleRegExp,
  nameValidation,
} from './validations';

export const addEmployeModalFormSchema = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  job_title: Yup.string()
    .transform((value) => value.trim())
    .matches(jobTitleRegExp, 'Job title is not valid')
    .required('Job title is required')
    .min(2, 'Job title is too short')
    .max(255, 'Job title is too long'),
  department: Yup.string().required('Department is required'),
  status: Yup.string().required('Status is required'),
  external_employment_id: emailValidation,
  work_email: emailValidation,
  annual_salary: Yup.number()
    .required('Annual salary is required')
    .min(1, 'Annual salary must be greater than 0'),
});

export const addContractModalFormSchema = Yup.object({
  employment_type: Yup.string()
    .required('Employment type is required')
    .oneOf(['Remote', 'Hybrid', 'Onsite'], 'Invalid employment type'),
  contract_duration: Yup.number()
    .required('Contract duration is required')
    .min(1, 'Contract duration must be at least 1 month'),
  work_hours_per_week: Yup.number()
    .required('Work hours per week is required')
    .min(1, 'Must be at least 1 hour'),
  paid_off_days: Yup.number()
    .required('Paid off days are required')
    .min(0, 'Cannot be negative'),
  role_description: Yup.string()
    .required('Role description is required')
    .min(10, 'Description should be at least 10 characters'),
  probation_period: Yup.string()
    .required('Probation period is required')
    .matches(/^\d+ month(s)?$/, 'Invalid probation period format'),
  resume: Yup.mixed()
    .required('Resume is required')
    .test('fileType', 'Only PDF or DOC/DOCX files are allowed', (value) =>
      value
        ? [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ].includes(value.type)
        : false
    ),
});
