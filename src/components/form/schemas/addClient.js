import * as Yup from 'yup';
import {
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from './validations';

export const basicInformationSchemaClient = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  address: Yup.string().required('Address is required'),
  join_date: dojValidation,
  phone_number: phoneValidation,
  email: emailValidation,
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) =>
        value &&
        ['image/jpg', 'image/jpeg', 'image/png', 'image/svg'].includes(
          value.type
        )
    ),
  company_name: Yup.string()
    .required('Company name is required')
    .min(3, 'Company name must be at least 3 characters long')
    .max(255, 'Company name cannot exceed 255 characters'),
  country: Yup.mixed().required('Country is required'),
});
export const securitySchemaClient = Yup.object({
  client_id: Yup.string()
    .required('Client id is required')
    .min(3, 'Client id must be at least 3 characters long')
    .max(255, 'Client id cannot exceed 255 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
