import React from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LeaveCalendarIcon from './leaveCalenderIcon';
import ActionBarComponent from './actionbarComponent';

const LeaveDatePicker = ({ label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
        // open={open}
        // onClose={handleClose}
        label={label || ''}
        sx={{ width: '600px' }}
         inputClass="custom-input"
        openTo="month"
        views={['year', 'month', 'day']}
        slots={{
            openPickerIcon: LeaveCalendarIcon,
            actionBar:()=><ActionBarComponent/>
        }}
        slotProps={{
          actionBar: {
            actions: ['accept','cancel'],
          },
        }}
        PopoverProps={{
          sx: {
            borderRadius: '30px', 
          },
        }}
          />
    </LocalizationProvider>
  );
};
export default LeaveDatePicker;
