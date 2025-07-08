import * as Yup from 'yup';
import {
  dobValidation,
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from './validations';

export const employeePersonalDataSchema = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  dob: dobValidation,
  gender: Yup.string()
    .required('Gender is required')
    .min(2, 'Gender  must be at least 2 characters long')
    .max(255, 'Gender cannot exceed 255 characters'),
  personal_email: emailValidation,
  marital_status: Yup.string()
    .required('Marital status is required')
    .min(2, 'Marital status must be at least 3 characters long')
    .max(255, 'Marital status cannot exceed 255 characters'),
  phone_number: phoneValidation,
});

export const employeeOfficialDataSchema = Yup.object({
  employee_id: Yup.string(),
  job_title: Yup.string(),
  role: Yup.string(),
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
  joining_date: dojValidation,
});
