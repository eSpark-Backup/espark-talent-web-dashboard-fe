'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AppTable from '@/src/components/dashboard/appTable';
import {
  timeTrackingTableColumn,
  timeTrackingTableData,
  trackingStatusTypes,
} from '@/src/constants/data/timeTracking';
import Link from 'next/link';
import AppSearchableDropdown from '@/src/components/dashboard/appSearchableDropdown';
import { renderTrackingStatus } from './renderComponents';
import AppCustomMonthYearPicker from '@/src/components/dashboard/appCustomMonthYearPicker';

const Dashboard = () => {
  const listItems = [
    'Arman Khan',
    'Bilal Ahmed Khan',
    'Areeba Shakeel',
    'Saad Zafar',
    'Muhammad Ali',
    'Sohaib-Xtreme',
    'Faizan-ur-Rehman',
    'Faisal Hanif',
    'Faraz Shah',
    'Abdul Rehman',
    'Abdul Mannan',
    'Hassan',
    'Muzammil',
    'Nauman',
    'Abdullah Zaidi',
  ];

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingEmployee, setIsLoadingEmployee] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState('');

  const fetchDataFake = async () => {
    return true;
  };

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

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
              <Typography variant="h3">Time Tracking</Typography>
              <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                  variant="caption"
                >
                  Time tracking is available for Team Members where legally
                  required or recommended.{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
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
                    eSpark Talent Help Center.
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box display={'flex'} alignItems="center" sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid display={'flex'} alignItems="center" item xs={12} md={6}>
                  <AppSearchableDropdown
                    setIsLoadingList={setIsLoadingEmployee}
                    isLoadingList={isLoadingEmployee}
                    selectedItem={selectedEmployee}
                    data={listItems}
                    setSelectedItem={setSelectedEmployee}
                  />

                  <AppCustomMonthYearPicker />
                </Grid>
              </Grid>
            </Box>
            <Box marginY={'30px'} display={'flex'} alignItems={'center'}>
              {trackingStatusTypes?.map(
                ({ label, shortForm, background }, statusIndex) =>
                  renderTrackingStatus({
                    label,
                    statusIndex,
                    background,
                    shortForm,
                  })
              )}
            </Box>
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <>
                {selectedEmployee ? (
                  <AppTable
                    column={timeTrackingTableColumn}
                    data={timeTrackingTableData}
                  />
                ) : (
                  <AppTable
                    column={timeTrackingTableColumn}
                    renderMessage="Select employee to see there data"
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
