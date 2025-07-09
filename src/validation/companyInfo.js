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

        const validExtensions = ['jpg', 'jpeg', 'png', 'svg'];

        // If it's a URL string
        if (typeof value === 'string') {
          const ext = value.split('.').pop().split('?')[0].toLowerCase();
          return validExtensions.includes(ext);
        }

        // If it's a File object
        if (typeof value === 'object' && value.name && value.type) {
          const fileExtension = value.name.split('.').pop().toLowerCase();
          const validMimeTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/svg+xml',
          ];
          return (
            validMimeTypes.includes(value.type) && fileExtension !== 'jfif'
          );
        }

        return false;
      }
    ),
});
