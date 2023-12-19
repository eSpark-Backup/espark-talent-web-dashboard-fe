import React from 'react';
import { Box, FormControl, IconButton, InputLabel, Typography } from '@mui/material';
import Image from 'next/image';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import CalendarIcon from './CalenderIcon';

  const DatePickerBox = ({ label, dateKey }) => {
      return (
      <>
      <Typography>{HIRING_FORM_DATA[dateKey]}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          label={label}
          sx={{
            width: { xs: '100%', md: '300px' },
            '@media (min-width: 960px) and (max-width: 1200px)': {
              width: '100%',
            },
            '& .MuiInputLabel-root': {
              color: '#888888',
            },
          }}
        
        />
        </LocalizationProvider>
      </>
  );
};

export default DatePickerBox;