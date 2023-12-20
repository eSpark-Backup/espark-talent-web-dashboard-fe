import React from 'react';
import { Box } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ReportDate = () => {
  return (
    <>
      <Box
        sx={{
          width: '400px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Basic date picker" />
        </LocalizationProvider>
      </Box>
    </>
  );
};
export default ReportDate;
