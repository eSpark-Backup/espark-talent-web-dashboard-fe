import * as Yup from 'yup';
import { emailValidation } from '@/src/validation/validations';

export const generalSettingFormSchema = Yup.object({
  email: emailValidation,
  companyName: Yup.string().required('Company name is required'),
});

export const pictureSchema = Yup.object({
  picture: Yup.mixed()
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
});
