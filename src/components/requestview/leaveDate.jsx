import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LeaveCalendarIcon from './leaveCalenderIcon';
import LeaveDatePicker from './leaveDatepicker';

const LeaveDate = ({ date, backgroundColor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: backgroundColor || '#fff',
        p: 1,
      }}
    >
      <Typography>{date}</Typography>
      {/* <Box
        sx={{
          background: '#fff',
          marginTop: '150px',
        }}
      > */}
      <Box sx={{ background: '#F6F6F6' }}>
        <LeaveDatePicker /> 
      </Box>

      {/* </Box> */}
    </Box>
  );
};
export default LeaveDate;
