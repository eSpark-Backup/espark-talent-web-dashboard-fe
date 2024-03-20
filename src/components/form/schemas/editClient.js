import * as Yup from 'yup';

export const editClientSchema = Yup.object({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  company_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone_number: Yup.string().required('Required'),
  join_date: Yup.string().required('Required'),
  country: Yup.mixed().required('Required'),
  address: Yup.string().required('Required'),
  image: Yup.mixed().required('Required'),
});
