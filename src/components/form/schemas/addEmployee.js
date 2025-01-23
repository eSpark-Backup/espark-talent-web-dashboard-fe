import * as Yup from 'yup';
import {
  dobValidation,
  emailValidation,
  interNameRegExp,
  nameValidation,
  phoneValidation,
  timeFormatRegex,
} from './validations';

export const basicInformationSchema = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  gender: Yup.string().required('Gender is required'),
  dob: dobValidation,
  phone_number: phoneValidation,
  email: emailValidation,
  personal_email: emailValidation,
  marital_status: Yup.string().required('Marital status is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) =>
        value && ['image/jpg', 'image/jpeg', 'image/png']?.includes(value?.type)
    ),
  emergency_no: phoneValidation,
  resume: Yup.mixed()
    .required('Resume is required')
    .test(
      'fileFormat',
      'Unsupported file format (only PDF allowed)',
      (value) =>
        value &&
        [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]?.includes(value?.type)
    ),
});

export const emergencyContactSchema = Yup.object({
  name1: nameValidation,
  name2: nameValidation,
  relation1: Yup.string()
    .required('Relation is required')
    .matches(
      interNameRegExp,
      ' name must contain only alphabetical characters'
    ),
  relation2: Yup.string()
    .required('Relation is required')
    .matches(
      interNameRegExp,
      'First name must contain only alphabetical characters'
    ),
  phoneNumber1: phoneValidation,
  phoneNumber2: phoneValidation,
});

export const companyDetailsSchema = Yup.object({
  joining_date: Yup.date()
    .typeError('Joining date must be a valid date')
    .required('Joining date is required'),
  role: Yup.string().required('Role is required'),
  job_title: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters long')
    .max(30, 'Job title cannot exceed 30 characters'),
  company: Yup.string().trim().required('Company is required'),
  job_status: Yup.string().required('Job Status is required'),
  starting_date: Yup.mixed()
    .test(
      'is-starting-date-required',
      'Starting date is required for Internship or Probation',
      function (value) {
        const { job_status } = this.parent;
        if (job_status === 'Internship' || job_status === 'Probation') {
          return !!value;
        }
        return true;
      }
    )
    .test(
      'is-valid-date',
      'Starting date must be a valid date',
      function (value) {
        const { job_status } = this.parent;
        if (
          (job_status === 'Internship' || job_status === 'Probation') &&
          value
        ) {
          return !isNaN(Date.parse(value));
        }
        return true;
      }
    ),
  ending_date: Yup.mixed()
    .test(
      'is-ending-date-required',
      'Ending date is required for Internship or Probation',
      function (value) {
        const { job_status } = this.parent;
        if (job_status === 'Internship' || job_status === 'Probation') {
          return !!value;
        }
        return true;
      }
    )
    .test(
      'is-valid-date',
      'Ending date must be a valid date',
      function (value) {
        const { job_status, starting_date } = this.parent;
        if (
          (job_status === 'Internship' || job_status === 'Probation') &&
          value
        ) {
          if (isNaN(Date.parse(value))) {
            return false;
          }
          if (starting_date && Date.parse(value) <= Date.parse(starting_date)) {
            return this.createError({
              message: 'Ending date must be after the starting date',
            });
          }
        }
        return true;
      }
    ),
});

export const securitySchema = Yup.object({
  employee_id: Yup.string().required('Employee ID is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const customTimeValidator = Yup.string()
  .required('Required')
  .matches(timeFormatRegex, 'Invalid time format');

export const timeAndLeaveAllotmentSchema = Yup.object({
  check_in: customTimeValidator,
  check_out: customTimeValidator,
  casual_leaves: Yup.string().required('Required'),
  sick_leaves: Yup.string().required('Required'),
  annual_leaves: Yup.string().required('Required'),
  hajj_leaves: Yup.string().required('Required'),
  paid_leaves: Yup.string().required('Required'),
  unpaid_leaves: Yup.string().required('Required'),
});
