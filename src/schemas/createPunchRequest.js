import * as Yup from 'yup';
import { dateFormatRegex } from './validations';

// Custom function to validate the date format
const isValidDateFormat = (value) => {
  // Regex pattern for matching the desired date format
  return dateFormatRegex.test(value);
};

// Schema definition
const createPunchRequestSchema = Yup.object({
  date: Yup.string()
    .required('Date is required')
    .test('is-valid-date', 'Invalid date format', isValidDateFormat)
    .test(
      'no-weekends',
      'Start date cannot be a Saturday or Sunday',
      (value) => {
        const day = new Date(value)?.getDay();
        return day !== 0 && day !== 6;
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
  description: Yup.string()
    .required('Description is required')
    .min(2, 'Description is too short - should be 2 chars minimum.')
    .max(255, 'Description is too long - should be 255 chars maximum.'),
});

export { createPunchRequestSchema, isValidDateFormat };
