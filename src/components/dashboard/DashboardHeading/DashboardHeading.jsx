import React from 'react';
import { Box, Typography } from '@mui/material';

import { DASHBOARD_DATA } from '@/app/constants/Dashboard';

const DashboardHeading = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: '30px',
          fontWeight: 600,
        }}
      >
        {DASHBOARD_DATA.greeting}
      </Typography>
      <br />
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: { xs: '20px', md: '14px' },
          fontWeight: 400,
        }}
      >
        {DASHBOARD_DATA.updates}
      </Typography>
      <br />
    </Box>
  );
};

export default DashboardHeading;
