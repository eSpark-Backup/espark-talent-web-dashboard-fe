'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import AttendanceSummary from '@/src/components/AtttendanceSummary/AttendanceSummary';
import LeaveSummary from '@/src/components/AtttendanceSummary/LeaveSummary';
import Clock from '@/src/components/AtttendanceSummary/Clock';
import Statistics from '@/src/components/AtttendanceSummary/Statistics';
import MarkClock from '@/src/components/AtttendanceSummary/MarkClock/MarkClock';
import TodayActivity from '@/src/components/AtttendanceSummary/TodayActivity';
import { getEmpHomeData } from '@/src/redux/slices/employeeSlices/empHomeSlice';
import { getEmployeeDetails, getWorkSpace } from '@/src/redux/slices/authSlice';
import { api } from '@/src/services/apiService';

import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { DASHBOARD_DATA } from '@/public/images/dashboard/constants/Dashboard';
import {
  Attendance_Summary_Title,
  Mark_CLock_Title,
} from '@/src/constants/employeeDashboard';
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const { empDetails } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { isLoading } = useQuery({
    // staleTime: 10000,
    queryFn: () => {
      return api
        .getData(`${EMP_HOME}/?workspace=${workSpace?.email || ''}`)
        .then(({ data }) => {
          dispatch(getEmpHomeData(data));
          dispatch(getWorkSpace(data?.workspaces?.[0]));
          dispatch(getEmployeeDetails(data?.employee_details));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        width={'100%'}
        height={40}
        sx={{ background: '#F6F6F6' }}
      />
    );
  }
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading
              title={`Hello ${empDetails?.employee_name}`}
              dashboardDescription={DASHBOARD_DATA?.updates}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AttendanceSummary title={Attendance_Summary_Title} />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <MarkClock data={Mark_CLock_Title} />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <LeaveSummary />
        </Grid>
      </Grid>
      <Box
        sx={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          mt: 5,
          '@media (max-width: 1599px)': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          <Box sx={{ width: { xs: '100%', md: 'calc(100% - 355px)' } }}>
            <Statistics />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '355px' } }}>
            <TodayActivity />
          </Box>
        </Box>
        <Box
          sx={{
            width: '440px',
            '@media (max-width: 1599px)': {
              width: '100%',
            },
          }}
        >
          <Clock />
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
