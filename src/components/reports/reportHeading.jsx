import React from 'react';
import { Box, Typography } from '@mui/material';

import { REPORT_DATA } from '@/src/constants/report';

const ReportHeading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '25px', md: '30px' },
          fontWeight: 600,
        }}
      >
        {REPORT_DATA?.downloadReports}
      </Typography>
      <br />
      <Typography
        sx={{
          fontSize: { xs: '15px', md: '14px' },
          fontWeight: 400,
        }}
      >
        {REPORT_DATA?.findReport}
      </Typography>
      <br />
    </Box>
  );
};

export default ReportHeading;
