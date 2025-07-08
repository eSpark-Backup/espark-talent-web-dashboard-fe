import dayjs from 'dayjs';

export const formatWithSeconds = (timeStr) => {
  if (!timeStr) return null;
  const formats = ['hh:mm:ss A', 'HH:mm:ss', 'hh:mm A', 'HH:mm'];
  return dayjs(timeStr, formats, true);
};

export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const time = dayjs(timeStr, ['HH:mm', 'hh:mm A']);
  return time.isValid() ? time.format('hh:mm:ss A') : '';
};
export const formatTimeMilliseconds = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function formatTimeToHHMM(time) {
  if (time === '-') return time;
  const [hour, minute, secondPart] = time?.split(':') || [];
  const period = secondPart?.split(' ')[1];
  return `${hour || ''}:${minute || ''} ${period || ''}`;
}
