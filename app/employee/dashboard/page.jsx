'use client';
import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import AttendanceSummary from '@/src/components/AtttendanceSummary/AttendanceSummary';
import LeaveSummary from '@/src/components/AtttendanceSummary/LeaveSummary';
import Clock from '@/src/components/AtttendanceSummary/Clock';
import { Clock_Title } from '@/src/constants/employeeDashboard';
import Image from 'next/image';

const Dashboard = () => {
  function timeToSeconds(time) {
    // Split the input time into hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Calculate the total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
  }

  const getPercentage = (time) => {
    const totalSeconds = 9 * 3600;
    const currentSeconds = timeToSeconds(time);
    const spentPercentage = (currentSeconds / totalSeconds) * 100;
    return Math.round(spentPercentage);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AttendanceSummary />
          <br />
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
              <Typography sx={{ fontSize: '25px', fontWeight: 600 }}>
                Mark clock in/ clock out
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                pt: 3,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              display={'flex'}
            >
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                Check in
              </Typography>

              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src="/icons/ClockIcon.svg"
                  width={20}
                  height={20}
                  alt="Clock"
                />
                <Typography
                  sx={{
                    color: '#171717',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    mx: '10px',
                  }}
                >
                  10:41 AM
                </Typography>
                <Typography
                  sx={{
                    color: '#595959',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  Exp: 10:00 AM
                </Typography>
              </Box>
            </Box>
            <br />
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              display={'flex'}
            >
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                Check out
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src="/icons/ClockIcon.svg"
                  width={20}
                  height={20}
                  alt="Clock"
                />
                <Typography
                  sx={{
                    color: '#171717',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    mx: '10px',
                    minWidth: '69.66px',
                  }}
                >
                  --:-- --
                </Typography>
                <Typography
                  sx={{
                    color: '#595959',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  Exp: 10:00 AM
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: '50px',
                // background:"#ccc",
                mx: { xs: 3, sm: 3, lg: 3 },
                my: '30px',
                border: 'solid 1px #ccc',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
              }}
              display={'flex'}
            >
              <Box
                sx={{
                  width: `${
                    getPercentage('03:10:00') < 100
                      ? getPercentage('03:10:00')
                      : 100
                  }%`,
                  background: '#E6F4F4',
                  height: '100%',
                }}
              ></Box>
              <Box
                sx={{
                  width: `${100 - getPercentage('03:10:00')}%`,
                  background: '#F5F5F5',
                  height: '100%',
                }}
              ></Box>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 'calc(50% - 24px)',
                  top: 'calc(50% - 8px)',
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: 'normal',
                }}
              >
                03:10:00
              </Typography>
            </Box>
            <Grid
              gap={'10px'}
              sx={{
                height: '50px',
                // background:"#ccc",
                mx: { xs: 3, sm: 3, lg: 3 },
                my: '30px',
                // border: "solid 1px #ccc",
                borderRadius: '5px',
                position: 'relative',
                // overflow: "hidden"
              }}
              display={'flex'}
            >
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Button
                  sx={{
                    border: '1px solid #E4E4E4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '10px',
                    width: '100%',
                    height: '50px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: 'normal',
                      ml: '10px',
                      '&:hover': {
                        color: '#fff',
                      },
                    }}
                  >
                    Mark check in
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Button
                  variant="contained"
                  sx={{
                    // border:"solid 1px #ccc",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '10px',
                    // borderRadius:'5px',
                    width: '100%',
                    height: '50px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFF',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: 'normal',
                      ml: '10px',
                    }}
                  >
                    Mark check out
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                height: '50px',
                // background:"#ccc",
                mx: { xs: 3, sm: 3, lg: 3 },
                my: '30px',
                // border: "solid 1px #ccc",
                borderRadius: '5px',
                position: 'relative',
                // overflow: "hidden"
              }}
              display={'flex'}
            >
              <Button
                variant="outlined"
                sx={{
                  // border:"solid 1px #ccc",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: '10px',
                  // borderRadius:'5px',
                  width: '100%',
                  height: '50px',
                  color: '#068987',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  '&:hover': {
                    color: '#fff',
                  },
                }}
              >
                <Image
                  src="/icons/TeaIcon1.svg"
                  style={{ marginRight: '10px' }}
                  width={20}
                  height={20}
                />
                Mark break out
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={5}>
          <LeaveSummary />
        </Grid>
        <Grid item xs={12} lg={12} xl={3}>
          <Box
            sx={{
              mx: { xs: 'auto', md: 0 },
              // width: { xs: 'auto', md: '300px' },
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
              <Typography
                sx={{ fontSize: '25px', fontWeight: 600, textAlign: 'left' }}
              >
                {Clock_Title}
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                height: '360px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // mx:"auto",
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
