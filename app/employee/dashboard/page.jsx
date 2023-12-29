'use client';
import React from 'react';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Box, Grid, Typography } from '@mui/material';
import AttendanceSummary from '@/src/components/AtttendanceSummary/AttendanceSummary';
import LeaveSummary from '@/src/components/AtttendanceSummary/LeaveSummary';

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'center',
              // paddingTop: '30px',
              // gap: '20px',
              width: '100%',
              // padding: { xs: '0px', sm: '30px', md: '40px', lg: '40px' },
            }}
          >
            <DashboardHeading />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AttendanceSummary />
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              height: '230px',
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
        <Grid item xs={5}>
          <LeaveSummary />
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              height: '230px',
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
              <Typography variant="h5">Clock</Typography>
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
      </Grid>
    </>
  );
};
export default Dashboard;
