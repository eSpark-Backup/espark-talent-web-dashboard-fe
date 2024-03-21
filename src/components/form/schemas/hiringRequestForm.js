import * as Yup from 'yup';

export const hiringRequestSchema = Yup.object({
  job_title: Yup.string().required('Required'),
  role_type: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  salary_range: Yup.object()
    .shape({
      minimum: Yup.number()
        .required('Required')
        .min(0, 'Minimum value must be greater than or equal to 0'),
      maximum: Yup.number()
        .required('Required')
        .min(
          Yup.ref('minimum'),
          'Maximum value must not be less than the minimum value'
        ),
    })
    .required('Required'),
  employment_term: Yup.string().required('Required'),
  hiring_start_date: Yup.string().required('Required'),
  hiring_end_date: Yup.string().required('Required'),
});
