'use client';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import AttendanceSummary from '@/src/components/AtttendanceSummary/AttendanceSummary';
import LeaveSummary from '@/src/components/AtttendanceSummary/LeaveSummary';
import Clock from '@/src/components/AtttendanceSummary/Clock';
import { Clock_Title } from '@/src/constants/employeeDashboard';
import { DASHBOARD_DATA } from '@/public/images/dashboard/constants/Dashboard';

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading dashboardDescription={DASHBOARD_DATA?.updates} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AttendanceSummary />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={4}>
          <Box
            sx={{
              height: '430px',
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2.5,
                height: '70px',
                borderRadius: '10px 10px 0px 0px',
                borderBottom: '1px solid #E4E4E4',
                background: '#FFF',
              }}
            >
              <Typography variant="h5">Mark clock in/ clock out</Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                py: 3,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={5}>
          <LeaveSummary />
        </Grid>
        <Grid item xs={12} lg={12} xl={3}>
          <Box
            sx={{
              mx: { xs: 'auto', md: 0 },
              width: { xs: 'auto', md: 'auto' },
              height: '430px',
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2.5,
                height: '70px',
                borderRadius: '10px 10px 0px 0px',
                borderBottom: '1px solid #E4E4E4',
                background: '#FFF',
              }}
            >
              <Typography variant="h5">{Clock_Title}</Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                height: '360px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Clock />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
