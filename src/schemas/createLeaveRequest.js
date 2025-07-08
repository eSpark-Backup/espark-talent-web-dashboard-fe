import * as Yup from 'yup';

const createLeaveRequestSchema = Yup.object({
  leaveType: Yup.mixed().required('Leave type is required'),
  startDate: Yup.date()
    .required('Start date is required')
    .test(
      'no-weekends',
      'Start date cannot be a Saturday or Sunday',
      (value) => {
        const day = new Date(value)?.getDay();
        return day !== 0 && day !== 6;
      }
    ),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be greater than start date')
    .test('no-weekends', 'End date cannot be a Saturday or Sunday', (value) => {
      const day = new Date(value)?.getDay();
      return day !== 0 && day !== 6;
    }),
  count: Yup.number().min(1, 'Count must be at least 1'),
  availableLeaves: Yup.string(),
  attachment: Yup.mixed()
    .required('Attachment is required')
    .test(
      'fileFormat',
      'Unsupported file format (only PDF allowed)',
      (value) =>
        value &&
        [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]?.includes(value?.type)
    )
    .test(
      'fileNameLength',
      'File name should not exceed 100 characters',
      (value) => value && value?.name?.length <= 100
    )
    .test(
      'fileSize',
      'File size should not exceed 5MB',
      (value) => value && value?.size <= 5 * 1024 * 1024 // <= 5MB
    ),
  reason: Yup.string()
    .required('Reason is required')
    .transform((value) => value.trim())
    .min(2, 'Reason is too short - should be 2 chars minimum.')
    .max(255, 'Reason is too long - should be 255 chars maximum.'),
});

const createWFHRequestSchema = Yup.object({
  startDate: Yup.date()
    .required('Start date is required')
    .test(
      'no-weekends',
      'Start date cannot be a Saturday or Sunday',
      (value) => {
        const day = new Date(value)?.getDay();
        return day !== 0 && day !== 6;
      }
    ),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be greater than start date')
    .test('no-weekends', 'End date cannot be a Saturday or Sunday', (value) => {
      const day = new Date(value)?.getDay();
      return day !== 0 && day !== 6;
    }),
  count: Yup.number().min(1, 'Count must be at least 1'),
  reason: Yup.string()
    .required('Reason is required')
    .transform((value) => value.trim())
    .min(2, 'Reason is too short - should be 2 chars minimum.')
    .max(255, 'Reason is too long - should be 255 chars maximum.'),
});

export { createLeaveRequestSchema, createWFHRequestSchema };
