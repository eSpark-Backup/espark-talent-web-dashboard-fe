import * as Yup from 'yup';
import { emailValidation, nameRegExp, websiteValidation } from './validations';

export const companyInfoSchema = Yup.object({
  company_name: Yup.string()
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Company name is not valid')
    .required('Contract name is required')
    .min(2, 'Contract name is too short - should be 2 chars minimum.')
    .max(255, 'Contract name is too long - should be 255 chars maximum.'),
  company_email: emailValidation,
  website_url: websiteValidation,
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
