import React from 'react';
import { Box, Typography } from '@mui/material';

import { DASHBOARD_DATA } from '@/src/constants/dashboard';

const DashboardHeading = ({ dashboardDescription }) => {
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
          color: '#595959',
        }}
      >
        {dashboardDescription}
      </Typography>
      <br />
    </Box>
  );
};

export default DashboardHeading;
