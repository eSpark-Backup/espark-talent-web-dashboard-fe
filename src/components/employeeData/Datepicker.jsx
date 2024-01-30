import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import CalendarIcon from '../StartHiring/CalenderIcon';

const DatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        className="date-picker-component"
        sx={{
          width: '100%',
          borderRadius: '50%',
          height: '45px',
          '& .MuiInputBase-input': {
            height: '7px',
          },
        }}
        slots={{
          openPickerIcon: CalendarIcon,
        }}
      />
    </LocalizationProvider>
  );
};
export default DatePicker;
