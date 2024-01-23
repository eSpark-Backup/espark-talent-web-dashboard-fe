import * as Yup from 'yup';

export const employeePersonalDataSchema = Yup.object({
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  maritalStatus: Yup.string().required('Required'),
  team: Yup.string().email('Invalid email address').required('Required'),
  dateOfJoining: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
});
