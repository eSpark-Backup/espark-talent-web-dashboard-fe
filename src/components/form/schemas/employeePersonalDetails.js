import * as Yup from 'yup';

export const employeePersonalDataSchema = Yup.object({
  employee_name: Yup.string(),
  employee_id: Yup.string(),
  dob: Yup.string(),
  gender: Yup.string(),
  // email: Yup.string().email('Invalid email address'),
  role: Yup.string(),
  // team: Yup.string().email('Invalid email address'),
  joining_date: Yup.string(),
  job_title: Yup.string(),
  marital_status: Yup.string(),
});
