import * as Yup from 'yup';

export const accountInfoSchema = Yup.object({
  accountName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  upload: Yup.mixed().required('Required'),
});
