import * as Yup from 'yup';
import { emailValidation } from './validations';

const generalSettingFormSchema = Yup.object({
  email: emailValidation,
  companyName: Yup.string().required('Company name is required'),
});

const pictureSchema = Yup.object({
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

export { generalSettingFormSchema, pictureSchema };
