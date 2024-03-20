import * as Yup from 'yup';

export const basicInformationSchema = Yup.object({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  dob: Yup.string().required('Required'),
  phone_number: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  marital_status: Yup.string().required('Required'),
  image: Yup.mixed().required('Required'),
  emergency_no: Yup.string().required('Required'),
  resume: Yup.mixed().required('Required'),
});
export const emergencyContactSchema = Yup.object({
  name1: Yup.string().required('Required'),
  name2: Yup.string().required('Required'),
  relation1: Yup.string().required('Required'),
  relation2: Yup.string().required('Required'),
  phoneNumber1: Yup.string().required('Required'),
  phoneNumber2: Yup.string().required('Required'),
});
export const companyDetailsSchema = Yup.object({
  joining_date: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
  job_title: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
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
export const timeAndLeaveAllotmentSchema = Yup.object({
  check_in: Yup.string().required('Required'),
  check_out: Yup.string().required('Required'),
  casual_leaves: Yup.string().required('Required'),
  sick_leaves: Yup.string().required('Required'),
  annual_leaves: Yup.string().required('Required'),
  hajj_leaves: Yup.string().required('Required'),
  paid_leaves: Yup.string().required('Required'),
  unpaid_leaves: Yup.string().required('Required'),
});
