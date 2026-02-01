export const calculateExpectedTime = (row) => {
  const { employee_details } = row || {};

  if (employee_details?.company) {
    const checkInTime = employee_details?.expect_check_in;
    const checkOutTime = employee_details?.expect_check_out;

    if (checkInTime && checkOutTime) {
      const checkInDate = new Date(
        `1970-01-01T${convertTo24Hour(checkInTime)}:00`
      );
      const checkOutDate = new Date(
        `1970-01-01T${convertTo24Hour(checkOutTime)}:00`
      );

      const timeDifferenceMs = checkOutDate - checkInDate;
      const hours = Math?.floor(timeDifferenceMs / (1000 * 60 * 60));
      return `${hours}h`;
    } else {
      console.error('Check-in or Check-out time is missing.');
      return null;
    }
  }
};

const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours] = time.split(':');
  if (modifier?.toLowerCase() === 'pm' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier?.toLowerCase() === 'am' && hours === '12') {
    hours = '00';
  }
  return `${hours}`;
};
