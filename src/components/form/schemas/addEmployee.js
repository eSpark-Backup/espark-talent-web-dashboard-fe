import * as Yup from 'yup';

export const basicInformationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  maritalStatus: Yup.string().required('Required'),
  image: Yup.mixed().required('Required'),
  emergencyContact: Yup.string().required('Required'),
  uploadResume: Yup.mixed().required('Required'),
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
  joinDate: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
});
export const securitySchema = Yup.object({
  employeeId: Yup.string().required('Employee ID is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
