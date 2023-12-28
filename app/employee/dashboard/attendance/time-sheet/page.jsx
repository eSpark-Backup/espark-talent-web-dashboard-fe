'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import AppTable from '@/src/components/dashboard/appTable';
import Link from 'next/link';
import { renderTrackingStatus } from './renderComponents';
import {
  sheetStatusTypes,
  timeSheetTableColumn,
  timeSheetTableData,
} from '@/src/constants/data/tables/timeSheet';
import Image from 'next/image';

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

  const [isLoading, setIsLoading] = useState(true);

  const fetchDataFake = async () => {
    return true;
  };

  useEffect(() => {
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
              <Typography variant="h3">Time sheet</Typography>
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
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box marginY={'30px'} display={'flex'} alignItems={'center'}>
                {sheetStatusTypes?.map(
                  ({ label, shortForm, background }, statusIndex) =>
                    renderTrackingStatus({
                      label,
                      statusIndex,
                      background,
                      shortForm,
                    })
                )}
              </Box>

              <Box display={'flex'} alignItems={'center'}>
                <Button
                  sx={{ marginX: '10px', minWidth: '120px' }}
                  variant="outlined"
                  startIcon={
                    <Image
                      width={20}
                      height={22}
                      alt="Refresh"
                      src={`/icons/Refresh.svg`}
                    />
                  }
                >
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: '120px',
                  }}
                  startIcon={
                    <Image
                      width={18}
                      height={15}
                      alt="Refresh"
                      src={`/icons/Filter.svg`}
                    />
                  }
                >
                  Filter
                </Button>
              </Box>
            </Box>
            <Box mb={'20px'}>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontWeight: 400,
                  lineHeight: '36px',
                  letterSpacing: '0em',
                  color: '#595959',
                }}
                textAlign={'center'}
              >
                Bilal Khan - (eS-00020)
              </Typography>
            </Box>
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <>
                <AppTable
                  column={timeSheetTableColumn}
                  data={timeSheetTableData}
                />
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
