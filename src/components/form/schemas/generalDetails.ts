import * as Yup from 'yup';
import { emailValidation } from './validations';

export const generalSettingFormSchema = Yup.object({
  email: emailValidation,
  companyName: Yup.string().required('Company name is required'),
});

export const pictureSchema = Yup.object({
  picture: Yup.mixed().required('Picture is required'),
});
