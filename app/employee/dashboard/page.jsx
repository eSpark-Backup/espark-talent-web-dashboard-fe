'use client';
import React from 'react';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Box, Grid } from '@mui/material';
import AttendanceSummary from '@/src/components/AtttendanceSummary/AttendanceSummary';

const Dashboard = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              // paddingTop: '30px',
              gap: '20px',
              width: '100%',
              // padding: { xs: '0px', sm: '30px', md: '40px', lg: '40px' },
            }}
          >
            <DashboardHeading />
            <Grid item xs={12}>
              <AttendanceSummary />
            </Grid>
            <Grid item xs={12}></Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
