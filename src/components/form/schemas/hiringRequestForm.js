import * as Yup from 'yup';

export const hiringRequestSchema = Yup.object({
    jobTitle: Yup.string().required('Required'),
    roleType: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    employmentTerm: Yup.string().required('Required'),
    hiringStartDate: Yup.string().required('Required'),
    hiringEndDate: Yup.string().required('Required'),
    salaryRange: Yup.object().shape({
        min: Yup.number().required('Required').min(0, 'Minimum value must be greater than or equal to 0'),
        max: Yup.number()
          .required('Required')
          .min(Yup.ref('min'), 'Maximum value must not be less than the minimum value'),
      }),
});