import { trackingStatusTypes } from '../constants/data/tables/timeTracking';

export const generateUniqueString = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 15; i++) {
    if (i === 5 || i === 13) {
      result += '-';
    } else {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  return result;
};

export const getAttendenceShortHand = (title) => {
  const val = trackingStatusTypes?.filter(({ label }) => label === title);
  return val[0].shortForm;
};

export const convertDateFormat = (dateString) => {
  var parts = dateString.split('-');

  // Swap day and month parts
  var temp = parts[0];
  parts[0] = parts[1];
  parts[1] = temp;

  // Construct the new date string in the desired format
  var newDateString = parts.join('-');

  return newDateString;
};
