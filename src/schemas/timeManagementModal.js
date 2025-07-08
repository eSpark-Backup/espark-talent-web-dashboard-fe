import * as Yup from 'yup';
import dayjs from 'dayjs';
import { timeRegExp } from './validations';

const timeManagementFormSchema = Yup.object({
  checkinTime: Yup.string().required('Checkin time is required'),
  checkoutTime: Yup.string().required('Checkout time is required'),
});

const validationSchema = Yup.object({
  check_in: Yup.string()
    .matches(timeRegExp, 'Invalid time format')
    .required('Check-In time is required'),
  check_out: Yup.string()
    .matches(timeRegExp, 'Invalid time format')
    .required('Check-Out time is required')
    .test(
      'checkOut-after-checkIn',
      'Check-Out time must be after Check-In time',
      function (value) {
        const { check_in } = this.parent;
        if (check_in && value) {
          const checkInTime = dayjs(check_in, 'HH:mm');
          const checkOutTime = dayjs(value, 'HH:mm');
          return checkOutTime.isAfter(checkInTime);
        }
        return true;
      }
    ),
});

export { validationSchema, timeManagementFormSchema };
