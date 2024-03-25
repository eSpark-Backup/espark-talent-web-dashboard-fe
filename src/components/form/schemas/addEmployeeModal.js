import * as Yup from 'yup';

export const addEmployeModalFormSchema = Yup.object({
  // employeeName: Yup.string().required('Required'),
  salary: Yup.string().required('Required'),
  job_title: Yup.string().required('Required'),
  role_type: Yup.string().required('Required'),
  employment_term: Yup.string().required('Required'),
  joining_date: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  benefits: Yup.mixed().required('Required'),
});
