import dayjs from 'dayjs';
import { trackingStatusTypes } from '../constants/data/tables/time-tracking';

const generateUniqueString = () => {
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

const getAttendenceShortHand = (title) => {
  const val = trackingStatusTypes?.filter(({ label }) => label === title);
  return val[0]?.shortForm;
};

const convertDateFormat = (dateString) => {
  var parts = dateString?.split('-');

  // Swap day and month parts
  var temp = parts[0];
  parts[0] = parts[1];
  parts[1] = temp;

  // Construct the new date string in the desired format
  var newDateString = parts?.join('-');

  return newDateString;
};

const countWeekendsHandler = (startDate, endDate) => {
  let start = dayjs(startDate);
  const end = dayjs(endDate);
  let weekendCount = 0;

  while (start?.isBefore(end, 'day') || start?.isSame(end, 'day')) {
    if (start?.day() === 6 || start?.day() === 0) {
      weekendCount++;
    }
    start = start?.add(1, 'day');
  }

  return weekendCount;
};

const restructureNotificationData = (originalData) => {
  // Check if originalData is empty or not an array
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return [];
  } else {
    // Step 1: Sort data based on the date and time fields
    const sortedData = [...originalData].sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // If dates are different, sort based on date
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB - dateA; // Latest date first
      } else {
        // If dates are same, sort based on time
        const timeA = new Date(`1970-01-01T${a.time}`);
        const timeB = new Date(`1970-01-01T${b.time}`);
        return timeB - timeA; // Latest time first
      }
    });

    // Step 2: Grouping the sorted data by date
    const groupedData = sortedData?.reduce((acc, item) => {
      // Extract date from item
      const date = item.date;

      // Find if there's already an entry with this date
      const existingEntry = acc?.find((entry) => entry.day === date);

      // If yes, add the item to its data array
      if (existingEntry) {
        existingEntry.data.push(item);
      } else {
        // If no, create a new entry
        acc.push({
          day: date,
          data: [item],
        });
      }

      return acc;
    }, []);

    // Function to get the value of day based on the date
    const getDayValue = (date) => {
      const currentDate = dayjs();
      const targetDate = dayjs(date);

      // If the date is today
      if (targetDate.isSame(currentDate, 'day')) {
        return 'Today';
      }

      // If the date is yesterday
      if (targetDate.isSame(currentDate.subtract(1, 'day'), 'day')) {
        return 'Yesterday';
      }

      // If the date is within the current week
      if (targetDate.isAfter(currentDate.subtract(7, 'day'), 'day')) {
        return targetDate.format('dddd'); // Full day name
      }

      // If the date is before one week
      return targetDate.format('YYYY-MM-DD'); // Remain as it is
    };

    // Step 3: Restructure the grouped data with manipulated day values
    const restructuredData = groupedData?.map((entry) => ({
      day: getDayValue(entry.day),
      data: entry.data,
    }));

    // Step 4: Return the restructured data
    return restructuredData;
  }
};

export {
  generateUniqueString,
  getAttendenceShortHand,
  convertDateFormat,
  countWeekendsHandler,
  restructureNotificationData,
};
