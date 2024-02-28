import React from 'react';
import { Box, Typography } from '@mui/material';

// import { DASHBOARD_DATA } from '@/src/constants/dashboard';
import { useSelector } from 'react-redux';

const DashboardHeading = ({ dashboardDescription }) => {
  const { empDetails } = useSelector((state) => state?.auth?.userData);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 600,
        }}
      >
        {`Hello ${empDetails?.employee_name}`}
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
