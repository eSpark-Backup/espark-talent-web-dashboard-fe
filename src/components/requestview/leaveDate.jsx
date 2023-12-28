import React from 'react';
import { Box, Typography } from '@mui/material';

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

      <Box sx={{ background: '#F6F6F6' }}>
        <LeaveDatePicker />
      </Box>
    </Box>
  );
};
export default LeaveDate;
