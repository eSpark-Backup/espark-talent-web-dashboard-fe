import React from 'react';
import { Box, Typography } from '@mui/material';

import { DASHBOARD_DATA } from '@/src/constants/dashboard';
import { ACTIVE_CLIENT } from '@/src/constants/data/client';

const DashboardHeading = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 600,
        }}
      >
      
        {DASHBOARD_DATA.greeting}
      </Typography>
      <br />
      <Typography
        sx={{
          fontSize: { xs: '20px', md: '14px' },
          fontWeight: 400,
        }}
      >
        {DASHBOARD_DATA?.greetingText}
      </Typography>
      <br />
    </Box>
  );
};

export default DashboardHeading;
