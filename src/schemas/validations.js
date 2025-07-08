import dayjs from 'dayjs';
import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

const emailRegExp =
  /^[A-Z0-9]+(?:[._%+-][A-Z0-9]+)*@[A-Z0-9]+(?:-[A-Z0-9]+)*(\.[A-Z0-9]+(?:-[A-Z0-9]+)*)+$/i;

const nameRegExp = /^[a-zA-Z\s'-]+$/;

const jobTitleRegExp = /^[a-zA-Z\s&.'-]+$/;

const interNameRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

const companyNameRegExp = /^[a-zA-Z0-9\s'&.-]+$/;

const phoneNumberRegExp = /^\+?[0-9]+$/;

const timeRegExp = /^([0-9]{2}):([0-9]{2})$/;

const dateFormatRegex =
  /^[a-zA-Z]{3}\s[a-zA-Z]{3}\s[0-9]{2}\s[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}\sGMT[+-][0-9]{4}\s\(([^)]+)\)$/;

const timeFormatRegex =
  /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;

const dobValidation = Yup.string()
  .required('Required')
  .test('dob-future', 'Date of birth cannot be in the future', (value) => {
    if (!value) return false;
    const dateOfBirth = dayjs(value);
    const today = dayjs();
    return dateOfBirth.isBefore(today) || dateOfBirth.isSame(today, 'day');
  });

// const phoneValidation = Yup.string()
//   .required('Contact number is required')
//   .matches(
//     phoneNumberRegExp,
//     'Phone number must contain only numeric characters and an optional leading +'
//   )
//   .min(6, 'Phone number must be at least 6 digits')
//   .max(16, 'Phone number must be at most 16 digits');

// added new validation for phone number
const phoneValidation = Yup.string()
  .test('phone', 'Invalid phone number', (value) =>
    value ? isValidPhoneNumber(value) : true
  )
  .required('Phone number is required');

const notRequiredValidation = Yup.string()
  .matches(
    phoneNumberRegExp,
    'Phone number must contain only numeric characters and an optional leading +'
  )
  .min(6, 'Phone number must be at least 6 digits')
  .max(16, 'Phone number must be at most 16 digits');

const emailValidation = Yup.string()
  .required('Email is required')
  .matches(emailRegExp, 'Invalid email address');

const companyValidation = Yup.string()
  .matches(companyNameRegExp, 'Company name is not valid')
  .required('Company name is required')
  .min(2, 'Company name is too short - should be 2 chars minimum.')
  .max(100, 'Company name is too long - should be 100 chars maximum.');

const websiteValidation = Yup.string()
  .required('Website url is required')
  .test('is-url', 'Invalid URL', (value) => {
    if (!value) return true;
    const urlRegex = /^(https?:\/\/|ftp:\/\/|www\.)[^\s/$.?#].[^\s]*$/;
    if (/^(https?:\/\/)(w{1,2}\.)/.test(value)) return false;
    if (/^(https?:\/\/)\./.test(value)) return false;
    if (/\.\./.test(value)) return false;
    return urlRegex.test(value);
  });

const nameValidation = Yup.string()
  .transform((value) => value.trim()) // Leading & trailing spaces remove karna
  .matches(nameRegExp, 'Name is not valid') // Sirf letters, hyphens, aur apostrophes allow hain
  .required('Name is required') // Blank value allowed nahi hai
  .min(2, 'Name is too short - should be 2 chars minimum.')
  .max(255, 'Name is too long - should be 255 chars maximum.');

const dojValidation = Yup.string()
  .required('Required')
  .test(
    'doj-valid',
    'Date of joining must be within 6 months from today',
    (value) => {
      if (!value) return false;
      const dateOfJoining = dayjs(value);
      const today = dayjs();
      const sixMonthsFromToday = today.add(6, 'month');
      return dateOfJoining.isBefore(sixMonthsFromToday, 'day');
    }
  );

export {
  companyNameRegExp,
  companyValidation,
  dateFormatRegex,
  dobValidation,
  dojValidation,
  emailRegExp,
  emailValidation,
  interNameRegExp,
  jobTitleRegExp,
  nameRegExp,
  nameValidation,
  notRequiredValidation,
  phoneNumberRegExp,
  phoneValidation,
  timeFormatRegex,
  timeRegExp,
  websiteValidation,
};
