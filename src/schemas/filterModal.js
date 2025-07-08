import * as Yup from 'yup';

const filterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  attendanceStatus: Yup.string(),
  checkIn: Yup.object().shape({
    from: Yup.string().required('Checkin time is required'),
    to: Yup.string().required('Checkin time is required'),
  }),
  checkOut: Yup.object().shape({
    from: Yup.string().required('Checkout time is required'),
    to: Yup.string().required('Checkout time is required'),
  }),
});

export { filterModalSchema };
