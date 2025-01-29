import * as Yup from 'yup';

export const createLeaveRequestSchema = Yup.object({
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
  count: Yup.number()
    .min(1, 'Count must be at least 1')
    .required('Count is required'),
  availableLeaves: Yup.string(),
  attachment: Yup.mixed()
    .required('Attachment is required')
    .test(
      'fileType',
      'Only PDF files are allowed',
      (value) => value && value?.type === 'application/pdf'
    ),
  reason: Yup.string().required('Reason is required'),
});

export const createWFHRequestSchema = Yup.object({
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
  count: Yup.number()
    .min(1, 'Count must be at least 1')
    .required('Count is required'),
  reason: Yup.string().required('Reason is required'),
});
