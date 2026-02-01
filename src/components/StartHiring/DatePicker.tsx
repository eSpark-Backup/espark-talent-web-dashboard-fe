import React from 'react';
import { Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import CalendarIcon from './CalenderIcon';

const DatePickerBox = ({ dateKey, placeholder }) => {
  return (
    <>
      <Typography>{HIRING_FORM_DATA[dateKey]}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className="date-picker-component"
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          placeholder={placeholder}
          slotProps={{
            textField: {
              placeholder: placeholder,
              sx: {
                '& input': {
                  color: '#88888',
                  padding: '9.95px 10px', // Set the desired font color for the placeholder
                },
              },
            },
          }}
          sx={{
            width: '100%',
            height: '40px',
            '@media (min-width: 900px) and (max-width: 1400px)': {
              width: '100%',
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerBox;
