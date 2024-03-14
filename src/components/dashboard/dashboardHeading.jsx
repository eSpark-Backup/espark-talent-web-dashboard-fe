import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardHeading = ({ dashboardDescription, title }) => {
  console.log({ dashbaords: dashboardDescription });
  // const { empDetails } = useSelector((state) => state?.auth?.userData);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 600,
        }}
      >
        {`Hello ${title}`}
        {/* Hello */}
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
