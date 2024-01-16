import * as Yup from 'yup';

export const editClientSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  maritalStatus: Yup.string().required('Required'),
  picture: Yup.mixed().required('Required'),
  company: Yup.string().required('Required'),
});