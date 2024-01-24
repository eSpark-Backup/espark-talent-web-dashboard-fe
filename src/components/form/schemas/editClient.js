import * as Yup from 'yup';

export const editClientSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phoneNumber: Yup.string().required('Required'),
  joinDate: Yup.string().required('Required'),
  country: Yup.mixed().required('Required'),
  address: Yup.string().required('Required'),
  picture: Yup.mixed().required('Required'),
});
