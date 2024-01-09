import React from 'react';
import { Box, Typography } from '@mui/material';

import SummarySlider from './SummarySlider';
import { Summary_Boxes } from '@/src/constants/employeeDashboard';

const AttendanceSummary = () => {
  return (
    <>
      <Box
        sx={{
          height: '230px',
          borderRadius: '10px',
          background: '#FFF',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 2.5,
            height: '70px',
            borderRadius: '10px 10px 0px 0px',
            borderBottom: '1px solid #E4E4E4',
            background: '#FFF',
          }}
        >
          <Typography sx={{ fontSize: {xs:'18px',md:'25px'}, fontWeight: 600 }}>
            Attendance Summary
          </Typography>
        </Box>
        <Box
          sx={{
            px: { xs: 3, md:'25px' },
            py: {xs: 3, md:'25px'},
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SummarySlider Summary_Boxes={Summary_Boxes} />
        </Box>
      </Box>
    </>
  );
};

export default AttendanceSummary;
