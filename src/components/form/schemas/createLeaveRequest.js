import * as Yup from 'yup';

export const createLeaveRequestSchema = Yup.object({
  leaveType: Yup.mixed().required('Leave type is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be greater than start date'),
  count: Yup.string(),
  availableLeaves: Yup.string(),
  attachment: Yup.mixed().required('Attachment is required'),
  reason: Yup.string().required('Reason is required'),
});

export const createWFHRequestSchema = Yup.object({
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  count: Yup.string(),
  reason: Yup.string().required('Reason is required'),
});
