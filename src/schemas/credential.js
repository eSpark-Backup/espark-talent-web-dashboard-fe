import * as Yup from 'yup';
import { emailValidation } from './validations';

const credentialFormSchema = Yup.object({
  emailCredential: emailValidation,
  passwordCredential: Yup.mixed().required('Required'),
});

export { credentialFormSchema };
