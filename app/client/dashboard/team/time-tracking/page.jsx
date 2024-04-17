'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';

import { timeTrackingTableColumn } from '@/src/constants/data/tables/timeTracking';
import AppSearchableDropdown from '@/src/components/dashboard/appSearchableDropdown';
import AppCustomMonthYearPicker from '@/src/components/dashboard/appCustomMonthYearPicker';
import AppTable from '@/src/components/appTableNew/AppTable';
import { TIMETRACKING } from '@/src/constants/TimeTracking';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_TIME_TRACKING } from '@/src/services/apiService/apiEndPoints';
import {
  fetchTimeTrackingDataRequest,
  fetchTimeTrackingDataRequestFailed,
  fetchTimeTrackingDataRequestSuccess,
} from '@/src/redux/slices/clientSlices/timeTrackingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.client?.timeTracking);
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['timeTrackingQuery'],
    queryFn: async () => {
      dispatch(fetchTimeTrackingDataRequest());
      return api
        .getData(`${CLIENT_TIME_TRACKING}`)
        .then(({ data }) => {
          dispatch(fetchTimeTrackingDataRequestSuccess(data));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchTimeTrackingDataRequestFailed());
          console.log({ err });
          console.log({ isLoading });
        });
    },
  });
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  // const fetchDataFake = async () => {
  //   return true;
  // };

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     try {
  //       await fetchDataFake();
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDataAsync();
  // }, []);

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant="h3">{TIMETRACKING?.timeTracking}</Typography>
              <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#595959',
                  }}
                  variant="caption"
                >
                  {TIMETRACKING?.teamMembers}{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#595959',
                  }}
                  variant="caption"
                >
                  {'To see a list of countries, please visit the '}
                  <Link
                    style={{
                      textDecoration: 'underline',
                    }}
                    href="/"
                  >
                    <span style={{ color: '#000', fontWeight: 400 }}>
                      {TIMETRACKING?.esparkCenter}
                    </span>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              alignItems="center"
              sx={{
                width: '100%',
                marginBottom: '15px',
                marginTop: '15px',
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  display={'flex'}
                  flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                  flexDirection={'row'}
                  gap={3}
                >
                  <AppSearchableDropdown
                    setIsLoadingList={setIsLoadingEmployee}
                    isLoadingList={isLoadingEmployee}
                    selectedItem={selectedEmployee}
                    data={data?.employees}
                    setSelectedItem={setSelectedEmployee}
                  />

                  <AppCustomMonthYearPicker />
                </Grid>
              </Grid>
            </Box>
            <br />

            <>
              {selectedEmployee ? (
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={timeTrackingTableColumn}
                    data={data?.time_sheet}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={timeTrackingTableColumn}
                    renderMessage={
                      isLoading ? (
                        <Skeleton
                          variant="text"
                          width={'400px'}
                          height={40}
                          sx={{ background: '#F6F6F6', fontSize: '2.5rem' }}
                        />
                      ) : (
                        'Select employee to see their data'
                      )
                    }
                  />
                </Box>
              )}
            </>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
