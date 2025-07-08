import * as yup from 'yup';
import { emailValidation } from './validations';

const AuthSchema = yup.object({
  email: emailValidation,
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export { AuthSchema };
