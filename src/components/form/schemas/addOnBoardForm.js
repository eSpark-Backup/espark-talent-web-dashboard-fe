import * as Yup from 'yup';

export const addOnboardFormSchema = Yup.object({
  employee_name: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  job_title: Yup.string().required('Required'),
  role_type: Yup.string().required('Required'),
  employment_term: Yup.string().required('Required'),
  joining_date: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  notice_period: Yup.string().required('Required'),
  salary: Yup.string().required('Required'),
  benefits: Yup.string().required('Required'),
});
