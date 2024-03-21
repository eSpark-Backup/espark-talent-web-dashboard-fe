import * as Yup from 'yup';

export const companyInfoSchema = Yup.object({
  company_name: Yup.string().required('Required'),
  company_email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  website_url: Yup.string().required('Required'),
  image: Yup.mixed().required('Required'),
});
