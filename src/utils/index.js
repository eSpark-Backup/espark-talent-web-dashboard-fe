import dayjs from 'dayjs';

const formatTimeToHHMM = (time) => {
  if (time === '-') return time;
  const [hour, minute, secondPart] = time?.split(':') || [];
  const period = secondPart?.split(' ')[1];
  return `${hour || ''}:${minute || ''} ${period || ''}`;
};

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const getTimePassedFromNow = (date, time) => {
  // Check if the time is in 12-hour or 24-hour format
  const is12HourFormat = /[0-9]{1,2}:[0-9]{2} [APMapm]{2}/.test(time);
  const formatString = is12HourFormat
    ? 'YYYY-MM-DD hh:mm A'
    : 'YYYY-MM-DD HH:mm';

  // Parse the date and time using the determined format
  const dateTime = dayjs(`${date} ${time}`, formatString);

  // Check if dateTime is valid
  if (!dateTime.isValid()) {
    console.error('Invalid date or time format', { date, time });
    return 'Invalid date or time';
  }

  const timeFromNow = dateTime?.fromNow();

  return timeFromNow;
};

export { formatTimeToHHMM, formatTime, getTimePassedFromNow };
