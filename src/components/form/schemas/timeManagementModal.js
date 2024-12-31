import * as Yup from 'yup';
import dayjs from 'dayjs';

export const validationSchema = Yup.object({
  check_in: Yup.string()
    .matches(/^([0-9]{2}):([0-9]{2})$/, 'Invalid time format')
    .required('Check-In time is required'),
  check_out: Yup.string()
    .matches(/^([0-9]{2}):([0-9]{2})$/, 'Invalid time format')
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
