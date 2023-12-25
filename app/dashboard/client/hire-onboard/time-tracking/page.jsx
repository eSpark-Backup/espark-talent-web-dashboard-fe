'use client';
import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import AppTable from '@/src/components/dashboard/appTable';
import {
  timeTrackingTableColumn,
  timeTrackingTableData,
  trackingStatusTypes,
} from '@/src/constants/data/timeTracking';
import Link from 'next/link';
import AppSearchableDropdown from '@/src/components/dashboard/appSearchableDropdown';
import { renderTrackingStatus } from './renderComponents';

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
  const [selectedEmployee, setSelectedEmployee] =
    React.useState('Sohaib-Xtreme');

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
            <Button
              style={{
                background: '#029894',
              }}
              variant="contained"
            >
              New hire
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>
            <AppSearchableDropdown
              setIsLoadingList={setIsLoadingEmployee}
              isLoadingList={isLoadingEmployee}
              selectedItem={selectedEmployee}
              data={listItems}
              setSelectedItem={setSelectedEmployee}
            />
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
              <AppTable
                column={timeTrackingTableColumn}
                data={timeTrackingTableData}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
