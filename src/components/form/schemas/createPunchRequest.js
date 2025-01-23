import * as Yup from 'yup';
import { dateFormatRegex } from './validations';

// Custom function to validate the date format
const isValidDateFormat = (value) => {
  // Regex pattern for matching the desired date format
  return dateFormatRegex.test(value);
};

// Custom function to check if date is not greater than maxDate
const isDateNotGreaterThanMaxDate = (value, maxDate) => {
  return new Date(value) <= maxDate;
};

// Schema definition
export const createPunchRequestSchema = Yup.object({
  date: Yup.string()
    .required('Date is required')
    .test('is-valid-date', 'Invalid date format', isValidDateFormat)
    .test(
      'not-greater-than-max-date',
      'Date should not be greater than max date',
      (value) => {
        // Define your maxDate here, for example, let's say it's today's date
        const maxDate = new Date();
        return isDateNotGreaterThanMaxDate(value, maxDate);
      }
    ),
  expectedCheckIn: Yup.string(),
  expectedCheckOut: Yup.string(),
  punchType: Yup.string().required('Punch type is required'),
  punch_time: Yup.date()
    .nullable()
    .required('Punch time is required')
    .default(undefined)
    .test(
      'is-defined',
      'Punch time is missing',
      (value) => value !== undefined
    ),
  description: Yup.string().required('Description is required'),
});
