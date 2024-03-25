'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import HrAccess from '@/src/components/dashboard/hrAccess';
import { DASHBOARD_DATA } from '@/public/images/dashboard/constants/Dashboard';
import { useSelector } from 'react-redux';
import { Summary_Boxes } from '@/src/constants/data/hrDashboard';

const Dashboard = () => {
  const getData = () => {
    const tempData = JSON.parse(JSON.stringify(Summary_Boxes)).map((item) => ({
      ...item,
      count: homeData[item.name],
    }));
    return tempData;
  };
  const { homeData } = useSelector((state) => state?.hr?.home);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading
              title={homeData.user}
              dashboardDescription={DASHBOARD_DATA?.dashboard}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <HrAccess isHr={true} data={getData()} />
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
