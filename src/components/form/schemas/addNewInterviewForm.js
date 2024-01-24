import * as Yup from 'yup';

export const addNewInterviewFormSchema = Yup.object({
  employeeName: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
  roleType: Yup.string().required('Required'),
  employmentTerm: Yup.string().required('Required'),
  interviewDateAndTime: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
});
