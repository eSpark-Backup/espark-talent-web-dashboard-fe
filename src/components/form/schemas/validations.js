import dayjs from 'dayjs';
import * as Yup from 'yup';

export const emailRegExp =
  /^[A-Z0-9]+(?:[._%+-][A-Z0-9]+)*@[A-Z0-9]+(?:-[A-Z0-9]+)*(\.[A-Z0-9]+(?:-[A-Z0-9]+)*)+$/i;
export const nameRegExp = /^[a-zA-Z\s'-]+$/;
export const interNameRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;
export const companyNameRegExp = /^[a-zA-Z0-9\s'&.-]+$/;
export const phoneNumberRegExp = /^\+?[0-9]+$/;
export const timeRegExp = /^([0-9]{2}):([0-9]{2})$/;
export const dateFormatRegex =
  /^[a-zA-Z]{3}\s[a-zA-Z]{3}\s[0-9]{2}\s[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}\sGMT[+-][0-9]{4}\s\(([^)]+)\)$/;
export const timeFormatRegex =
  /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;

export const dobValidation = Yup.string()
  .required('Required')
  .test('dob-future', 'Date of birth cannot be in the future', (value) => {
    if (!value) return false;
    const dateOfBirth = dayjs(value);
    const today = dayjs();
    return dateOfBirth.isBefore(today) || dateOfBirth.isSame(today, 'day');
  });

export const phoneValidation = Yup.string()
  .required('Contact number is required')
  .matches(
    phoneNumberRegExp,
    'Phone number must contain only numeric characters and an optional leading +'
  )
  .min(6, 'Phone number must be at least 6 digits')
  .max(16, 'Phone number must be at most 16 digits');

export const notRequiredValidation = Yup.string()
  .matches(
    phoneNumberRegExp,
    'Phone number must contain only numeric characters and an optional leading +'
  )
  .min(6, 'Phone number must be at least 6 digits')
  .max(16, 'Phone number must be at most 16 digits');

export const emailValidation = Yup.string()
  .required('Email is required')
  .matches(emailRegExp, 'Invalid email address');

export const companyValidation = Yup.string()
  .matches(companyNameRegExp, 'Company name is not valid')
  .required('Company name is required')
  .min(2, 'Company name is too short - should be 2 chars minimum.')
  .max(100, 'Company name is too long - should be 100 chars maximum.');
export const websiteValidation = Yup.string()
  .required('Website url is required')
  .test('is-url', 'Invalid URL', (value) => {
    if (!value) return true;
    const urlRegex =
      /^(https?:\/\/)((www\.)?[a-zA-Z0-9@:%._+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._+~#?&//=]*))$/;
    if (/^(https?:\/\/)(w{1,2}\.)/.test(value)) return false;
    if (/^(https?:\/\/)\./.test(value)) return false;
    if (/\.\./.test(value)) return false;
    return urlRegex.test(value);
  });
export const nameValidation = Yup.string()
  .transform((value) => value.replace(/\s+/g, '')) // Removes all spaces before validation
  .matches(nameRegExp, 'Name is not valid')
  .required('Name is required')
  .min(2, 'Name is too short - should be 2 chars minimum.')
  .max(50, 'Name is too long - should be 50 chars maximum.');

export const dojValidation = Yup.string()
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
