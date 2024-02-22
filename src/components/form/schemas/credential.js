import * as Yup from 'yup';

export const credentialFormSchema = Yup.object({
  emailCredential: Yup.string().required('Required'),
  passwordCredential: Yup.mixed().required('Required'),
});
