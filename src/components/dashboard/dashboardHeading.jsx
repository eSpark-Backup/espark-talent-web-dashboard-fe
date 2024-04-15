import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardHeading = ({ dashboardDescription, title }) => {
  // console.log({ dashbaords: dashboardDescription });
  // const { empDetails } = useSelector((state) => state?.auth?.userData);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'start' },
        gap: 1.4,
        my: 1,
        ml: 0.5,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '26px', md: '28px', lg: '30px' },
          fontWeight: 600,
        }}
      >
        {title || ''}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '14px', lg: '14px' },
          fontWeight: 400,
          color: '#595959',
          textAlign: { xs: 'center', sm: 'start' },
        }}
      >
        {dashboardDescription || ''}
      </Typography>
    </Box>
  );
};

export default DashboardHeading;
