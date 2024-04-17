import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const DashboardHeading = ({ dashboardDescription, title, isLoading }) => {
  // console.log({ dashbaords: dashboardDescription });
  // const { empDetails } = useSelector((state) => state?.auth?.userData);

  return isLoading ? (
    <Stack spacing={1.5} sx={{ width: { xs: '100%', md: '200px' } }}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
    </Stack>
  ) : (
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
