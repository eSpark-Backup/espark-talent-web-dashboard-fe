import React from 'react';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import CalendarIcon from './CalenderIcon';

const DatePickerBox = ({ dateKey, placeholder }) => {
  return (
    <>
      <Typography>{HIRING_FORM_DATA[dateKey]}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          placeholder={placeholder}
          slotProps={{ textField: { placeholder: placeholder , sx: {
        '& input': {
          color: '#88888', // Set the desired font color for the placeholder
        },
      }, } }}
          sx={{
            width: '100%',
            height:"40px",
            '@media (min-width: 900px) and (max-width: 1400px)': {
              width: '100%',
            },
            // '& .MuiInputLabel-root': {
            //   color: '#88888',
            // },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerBox;
