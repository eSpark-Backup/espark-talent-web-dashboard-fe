import * as Yup from 'yup';
import { emailValidation, nameValidation } from './validations';

export const accountInfoSchema = Yup.object({
  account_name: nameValidation,
  email: emailValidation,
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
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
});

export const editAccountInfoSchema = Yup.object({
  account_name: nameValidation,
  email: emailValidation,
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  image: Yup.mixed()
    .nullable()
    .test(
      'fileFormat',
      'Only .jpg, .jpeg, .png, and .svg files are allowed',
      (value) => {
        if (!value) return true;

        const validMimeTypes = [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/svg+xml',
        ];
        const fileExtension = value?.name?.split('.').pop()?.toLowerCase();

        return validMimeTypes.includes(value?.type) && fileExtension !== 'jfif';
      }
    ),
});
