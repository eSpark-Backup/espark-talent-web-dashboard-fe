import * as Yup from 'yup';

export const hiringRequestSchema = Yup.object({
  job_title: Yup.string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters long')
    .max(255, 'Job title cannot exceed 255 characters'),
  role_type: Yup.string()
    .required('Role type is required')
    .min(3, 'role type must be at least 3 characters long')
    .max(255, 'role type cannot exceed 255 characters'),
  gender: Yup.string()
    .required('Gender is required')
    .min(3, 'Gender  must be at least 3 characters long')
    .max(255, 'Gender cannot exceed 255 characters'),
  country: Yup.object().required('Country is required'),
  salary_currency: Yup.string()
    .required('currency is required')
    .min(3, 'currency must be at least 3 characters long')
    .max(255, 'currency cannot exceed 255 characters'),
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
  employment_term: Yup.string()
    .required('Employement term is required')
    .min(3, 'Employement term must be at least 3 characters long')
    .max(255, 'Employement term cannot exceed 255 characters'),
  hiring_start_date: Yup.string().required('Hiring start date is required'),
  hiring_end_date: Yup.string()
    .required('Hiring end date is required')
    .test(
      'is-greater',
      'End date must be greater than start date',
      function (endDate) {
        const { hiring_start_date } = this.parent;
        if (!hiring_start_date || !endDate) return true;
        return new Date(endDate) >= new Date(hiring_start_date);
      }
    ),
  job_description: Yup.mixed()
    .required('Job description is required')
    .test(
      'fileFormat',
      'Only PDF files are allowed',
      (value) => value && value.type === 'application/pdf'
    )
    .test(
      'fileSize',
      'File size should not exceed 5MB',
      (value) => value && value.size <= 5 * 1024 * 1024
    )
    .test(
      'fileNameLength',
      'File name should not exceed 100 characters',
      (value) => value && value.name.length <= 100
    ),
  comments: Yup.string()
    .nullable()
    .notRequired()
    .test(
      'is-not-just-spaces',
      'Comments cannot be just spaces',
      (value) => !value || value?.trim()?.length > 0
    )
    .min(3, 'Comments should be at least 3 characters long')
    .max(255, 'Comments cannot exceed 255 characters'),
});
