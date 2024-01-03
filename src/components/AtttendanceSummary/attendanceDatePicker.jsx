import React, { useState } from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LeaveCalendarIcon from './CalenderIcon';

const AttendanceDatePicker = ({ display }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            background: '#F6F6F6',
            width: '68%',
          }}
          disabled={display}
          openTo="month"
          views={['year', 'month', 'day']}
          open={open}
          onClose={handleClose}
          slots={{
            openPickerIcon: () => <LeaveCalendarIcon open={handleOpen} />,
          }}
        />
      </LocalizationProvider>
    </>
  );
};
export default AttendanceDatePicker;
