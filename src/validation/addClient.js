import * as Yup from 'yup';
import {
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from '@/src/validation/validations';

export const basicInformationSchemaClient = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  address: Yup.string()
    .required('Address is required')
    .min(2, 'Address must be at least 2 characters long')
    .max(255, 'Address cannot exceed 255 characters'),
  join_date: dojValidation,
  phone_number: phoneValidation,
  email: emailValidation,
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileFormat',
      'Only .jpg, .jpeg, .png, and .svg files are allowed',
      (value) => {
        if (!value) return false;

        const validMimeTypes = [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/svg+xml',
        ];
        const fileExtension = value?.name?.split('.')?.pop()?.toLowerCase();

        return (
          validMimeTypes?.includes(value?.type) && fileExtension !== 'jfif'
        );
      }
    ),
  company_name: Yup.string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters long')
    .max(255, 'Company name cannot exceed 255 characters'),
  country: Yup.mixed().required('Country is required'),
});

export const securitySchemaClient = Yup.object({
  client_id: Yup.string()
    .required('Client id is required')
    .min(1, 'Client id must be at least 1 characters long')
    .max(255, 'Client id cannot exceed 255 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
