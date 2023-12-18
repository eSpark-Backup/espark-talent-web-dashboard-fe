'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import OnBoarding from '@/src/components/dashboard/onBoarding';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import DiscoverTalentPlatform from '@/src/components/dashboard/discoverTalent';

const Dashboard = () => {
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '60px',
            gap: '20px',
            width: '100%',
          }}
        >
          <DashboardHeading />
          <DiscoverTalentPlatform />
          <OnBoarding />
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
