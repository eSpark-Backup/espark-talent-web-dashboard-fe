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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              // paddingTop: '60px',
              gap: '20px',
              width: '100%',
              // paddingLeft: { xs: '0px', md: '40px' },
            }}
          >
            <DashboardHeading />
            <Grid item xs={12}>
              <DiscoverTalentPlatform />
            </Grid>
            <Grid item xs={12}>
              <OnBoarding />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
