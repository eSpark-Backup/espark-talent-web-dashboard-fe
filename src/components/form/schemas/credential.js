import * as Yup from 'yup';

export const credentialFormSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.mixed().required('Required'),
});
