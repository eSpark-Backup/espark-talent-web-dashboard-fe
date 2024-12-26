import * as Yup from 'yup';

export const hiringFormSchema = Yup.object({
  jobTitle: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters long') // Minimum length
    .max(30, 'Job title cannot exceed 30 characters'), // Maximum length
  roleType: Yup.string().required('Role type is required'),
  gender: Yup.string().required('Gender is required'),
  country: Yup.object().required('Country is required'),
  salary_currency: Yup.string().required('Currency is required'),
  salary_range: Yup.object()
    .shape({
      minimum: Yup.number()
        .required('Min range is required')
        .min(0, 'Minimum value must be greater than or equal to 0'),
      maximum: Yup.number().when('minimum', (minimum, schema) =>
        minimum
          ? schema
              .required('Max range is required')
              .min(
                minimum,
                'Maximum value must not be less than the minimum value'
              )
          : schema
      ),
    })
    .required('Salary range is required'),
  employmentTerm: Yup.string().required('Employement term is required'),
  hiringStartDate: Yup.string().required('Hiring start date is required'),
  hiringEndDate: Yup.string()
    .required('Hiring end date is required')
    .test(
      'is-greater',
      'End date must be greater than start date',
      function (endDate) {
        const { hiringStartDate } = this.parent;
        if (!hiringStartDate || !endDate) return true; // If any date is missing, skip validation
        return new Date(endDate) >= new Date(hiringStartDate);
      }
    ),
});
