import * as Yup from 'yup';

export const basicInformationSchemaClient = Yup.object({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  join_date: Yup.string().required('Required'),
  phone_number: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  image: Yup.mixed().required('Required'),
  company_name: Yup.string().required('Required'),
  country: Yup.mixed().required('Required'),
});
export const securitySchemaClient = Yup.object({
  client_id: Yup.string().required('Employee ID is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
