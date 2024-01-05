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
import { EMPLOYEE_TIMESHEET } from '@/src/constants/timeSheet';

const Dashboard = () => {
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
                    color: '#595959',
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
                    eSpark Talent Help Center.
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
              width: '100%',
              background: '#FAFAFA',
              padding: '20px',
              gap: '15px',
              flexDirection: 'column',
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {EMPLOYEE_TIMESHEET.map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  margin: '5px 0',
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '40px',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '5px',
                      height: '40px',
                      borderRadius: '5px 0px 0px 5px',
                      backgroundColor: `${item.verticalLineColor}`,
                    }}
                  ></div>
                  <Typography>{Object.values(item)[0]}</Typography>
                </Box>

                <Typography sx={{ marginRight: '6PX' }}>
                  {Object.values(item)[1]}
                </Typography>
              </Box>
            ))}
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
                  sx={{
                    marginX: '10px',
                    minWidth: '120px',
                    border: '1px solid #138A72',
                    color: '#138A72',
                    '&:hover:': {
                      background: '#fff',
                    },
                  }}
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
                  sx={{
                    minWidth: '120px',
                    background: '#138A72',
                    color: '#fff',
                    '&:hover': {
                      background: '#138A72',
                    },
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
