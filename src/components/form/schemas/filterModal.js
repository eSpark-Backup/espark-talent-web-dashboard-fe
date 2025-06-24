import * as Yup from 'yup';

export const filterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  attendanceStatus: Yup.string(),
  checkIn: Yup.object().shape({
    from: Yup.string(),
    to: Yup.string(),
  }),
  checkOut: Yup.object().shape({
    from: Yup.string(),
    to: Yup.string(),
  }),
});
