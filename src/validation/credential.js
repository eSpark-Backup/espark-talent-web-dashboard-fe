import * as Yup from 'yup';
import { emailValidation } from '@/src/validation/validations';

export const credentialFormSchema = Yup.object({
  emailCredential: emailValidation,
  passwordCredential: Yup.mixed().required('Required'),
});
