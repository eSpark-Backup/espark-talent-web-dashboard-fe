'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';

import OnBoarding from '@/src/components/dashboard/onBoarding';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import DiscoverTalentPlatform from '@/src/components/dashboard/discoverTalent';
import { DASHBOARD_DATA } from '@/public/images/dashboard/constants/Dashboard';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { username } = useSelector((state) => state?.client?.home?.data);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
              width: '100%',
            }}
          >
            <DashboardHeading
              title={username || 'World'}
              dashboardDescription={DASHBOARD_DATA?.updates}
              isLoading={isLoading}
            />

            <Grid item xs={12}>
              <DiscoverTalentPlatform isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <OnBoarding isLoading={isLoading} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
