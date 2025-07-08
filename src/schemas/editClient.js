import * as Yup from 'yup';
import {
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from './validations';

export const editClientSchema = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  company_name: Yup.string()
    .trim()
    .required('Company name is required')
    .min(2, 'Company name must be at least 3 characters long')
    .max(255, 'Company name cannot exceed 255 characters'),
  email: emailValidation,
  phone_number: phoneValidation,
  join_date: dojValidation,
  country: Yup.mixed().required('Country is required'),
  address: Yup.string()
    .required('Address is required')
    .min(2, 'Address must be at least 2 characters long')
    .max(255, 'Address cannot exceed 255 characters')
    .matches(/^[a-zA-Z0-9\s.,#-]+$/, 'Enter a valid address'),
});
