import * as Yup from 'yup';

export const addOnboardFormSchema = Yup.object({
  employeeName: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
  roleType: Yup.string().required('Required'),
  employmentTerm: Yup.string().required('Required'),
  joiningDate: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  noticePeriod: Yup.string().required('Required'),
  salary: Yup.string().required('Required'),
  benefits: Yup.string().required('Required'),
});
