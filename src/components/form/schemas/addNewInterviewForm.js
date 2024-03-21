import * as Yup from 'yup';

export const addNewInterviewFormSchema = Yup.object({
  employee_name: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  job_title: Yup.string().required('Required'),
  role_type: Yup.string().required('Required'),
  employment_term: Yup.string().required('Required'),
  interview_date_time: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
});
