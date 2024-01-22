'use client';
import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import AttendanceSummary from '@/src/components/AtttendanceSummary/AttendanceSummary';
import LeaveSummary from '@/src/components/AtttendanceSummary/LeaveSummary';
import Clock from '@/src/components/AtttendanceSummary/Clock';
import { Clock_Title } from '@/src/constants/employeeDashboard';
import Image from 'next/image';
import { DASHBOARD_DATA } from '@/public/images/dashboard/constants/Dashboard';

const Dashboard = () => {
  function timeToSeconds(time) {
    console.log({ time });
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
  const getPercentage1 = (time, totalHours = 9) => {
    const totalSeconds = totalHours * 3600;
    // const currentSeconds = timeToSeconds(time);
    const spentPercentage = (time / totalSeconds) * 100;
    return Math.round(spentPercentage);
  };
  const data = [
    {
      title: 'Today',
      hoursCompleted: '3.45',
      totalHours: '8',
      remainingBack: '#E6F4F4',
      background: '#FEDB41',
    },
    {
      title: 'This week',
      hoursCompleted: '28',
      totalHours: '40',
      remainingBack: '#E6F4F4',
      background: '#F4B844',
    },
    {
      title: 'This month',
      hoursCompleted: '90',
      totalHours: '160',
      remainingBack: '#E6F4F4',
      background: '#2D9C98',
    },
    {
      title: 'Remaining',
      hoursCompleted: '90',
      totalHours: '160',
      remainingBack: '#E6F4F4',
      background: '#B24057',
    },
    {
      title: 'Overtime',
      hoursCompleted: '4',
      totalHours: '20',
      remainingBack: '#E6F4F4',
      background: '#338CB2',
    },
  ];

  const timelineData = [
    {
      id: 1,
      title: 'Check in',
      time: '10:00 AM',
    },
    {
      id: 2,
      title: 'Break at',
      time: '10:00 AM',
      description: 'Description of Event 2.',
    },
    {
      id: 3,
      title: 'Resumed at',
      time: '10:00 AM',
    },
    {
      id: 3,
      title: 'Check out',
      time: '10:00 AM',
    },
    // Add more items as needed
  ];

  return (
    <>
      <Grid container spacing={5}>
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
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Box
            sx={{
              height: { xs: 'auto', md: '430px' },
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
                sx={{
                  fontSize: { xs: '12px', md: '25px' },
                  fontWeight: 600,
                  color: '#171717',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                }}
              >
                Mark clock in/ clock out
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                pt: 3,
                pb: 3,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              display={'flex'}
            >
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: { xs: '14px', md: '20px' },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                Check in
              </Typography>

              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src="/icons/ClockIcon.svg"
                  width={25}
                  height={25}
                  alt="Clock"
                />
                <Typography
                  sx={{
                    color: '#171717',
                    textAlign: 'center',
                    fontSize: { xs: '12px', md: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 600,
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
                    fontSize: { xs: '10px', md: '14px' },
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  Exp: 10:00 AM
                </Typography>
              </Box>
            </Box>
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
                  fontSize: { xs: '14px', md: '20px' },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                Check out
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src="/icons/ClockIcon.svg"
                  width={25}
                  height={25}
                  alt="Clock"
                />
                <Typography
                  sx={{
                    color: '#171717',
                    textAlign: 'center',
                    fontSize: { xs: '12px', md: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 600,
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
                    fontSize: { xs: '10px', md: '14px' },
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  Exp: 07:00 AM
                </Typography>
              </Box>
            </Box>
            <Box sx={{ py: '30px' }}>
              <Box
                sx={{
                  height: '50px',
                  // background:"#ccc",
                  mx: { xs: 3, sm: 3, lg: 3 },
                  // my: '30px',
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
                      getPercentage('08:15:35') < 100
                        ? getPercentage('08:15:35')
                        : 100
                    }%`,
                    background: '#E6F4F4',
                    height: '100%',
                  }}
                ></Box>
                <Box
                  sx={{
                    width: `${100 - getPercentage('08:15:35')}%`,
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
                    fontWeight: 600,
                    lineHeight: 'normal',
                  }}
                >
                  08:15:35
                </Typography>
              </Box>
            </Box>
            <Grid
              gap={'10px'}
              sx={{
                height: '50px',
                // background:"#ccc",
                mx: { xs: 3, sm: 3, lg: 3 },
                // my: '30px',
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
                      fontWeight: 400,
                      lineHeight: 'normal',
                      ml: '10px',
                      textTransform: 'math-auto',
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
                      color: '#FFF',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                      ml: '10px',
                      textTransform: 'math-auto',
                    }}
                  >
                    Mark check out
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ py: { xs: '30px', md: 0 } }}>
              <Box
                sx={{
                  height: '50px',
                  // background:"#ccc",
                  mx: { xs: 3, sm: 3, lg: 3 },
                  my: { xs: 0, md: '30px' },
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
                    fontWeight: 400,
                    lineHeight: 'normal',
                    textTransform: 'math-auto',
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
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <LeaveSummary />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Box
            sx={{
              height: '470px',
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
                sx={{
                  fontSize: '25px',
                  fontWeight: 600,
                }}
              >
                Statistics
              </Typography>
            </Box>
            <Box p={'20px'}>
              {data?.map(
                (
                  {
                    title,
                    hoursCompleted,
                    totalHours,
                    remainingBack,
                    background,
                  },
                  index
                ) => {
                  return (
                    <Box
                      sx={{
                        boxShadow: '0px 0px 5px 2px #ccc',
                        borderRadius: '5px',
                        // height:"40px",
                        width: '100%',
                        mb: '20px',
                        p: '10px',
                      }}
                      display={'flex'}
                      flexDirection={'column'}
                      key={index}
                    >
                      <Box
                        display={'flex'}
                        alignItem={'center'}
                        justifyContent={'space-between'}
                      >
                        <Typography
                          sx={{
                            color: '171717',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '171717',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                          }}
                        >{`${hoursCompleted} / ${totalHours}`}</Typography>
                      </Box>
                      <Box
                        sx={{
                          height: '10px',
                          border: 'solid 1px #ccc',
                          borderRadius: '5px',
                          position: 'relative',
                          overflow: 'hidden',
                          mt: '10px',
                        }}
                        display={'flex'}
                        flexDirection={'row-reverse'}
                      >
                        <Box
                          sx={{
                            width: `${
                              getPercentage1(
                                +hoursCompleted * 3600,
                                +totalHours
                              ) < 100
                                ? getPercentage1(
                                    +hoursCompleted * 3600,
                                    +totalHours
                                  )
                                : 100
                            }%`,
                            background: background,
                            height: '100%',
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: `${
                              100 -
                              getPercentage1(
                                +hoursCompleted * 3600,
                                +totalHours
                              )
                            }%`,
                            background: remainingBack,
                            height: '100%',
                          }}
                        ></Box>
                      </Box>
                    </Box>
                  );
                }
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={3} lg={3} xl={3}>
          <Box
            sx={{
              mx: { xs: 'auto', md: 0 },
              width: { xs: 'auto', md: 'auto' },
              height: '470px',
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
                sx={{
                  fontSize: '25px',
                  fontWeight: 600,
                }}
              >
                Today Activity
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: 'calc(100% - 70px)',
                // height:"100%"
              }}
            >
              <Box>
                {timelineData.map(({ title, time }, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                  >
                    <Box
                      sx={{
                        width: '25px',
                        height: '25px',
                        border: 'solid 2px #068987',
                        borderRadius: '50%',
                        position: 'relative',
                      }}
                      display={'flex'}
                      alignItems={'center'}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '40px',
                          width: '150px',
                          top: 0,
                        }}
                        display={'flex'}
                        flexDirection={'column'}
                      >
                        <Typography
                          sx={{
                            color: '#171717',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#595959',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            display: 'flex',
                            marginTop: '10px',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <Image
                            src={'/icons/ClockIcon.svg'}
                            width={20}
                            height={20}
                          />{' '}
                          {time}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: '2px',
                        height: '60px',
                        background: '#ccc',
                      }}
                    ></Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={3} lg={3} xl={3}>
          <Box
            sx={{
              mx: { xs: 'auto', md: 0 },
              // width: { xs: 'auto', md: '300px' },
              // height: '430px',
              height: '100%',
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
                sx={{
                  fontSize: { xs: '18px', md: '25px' },
                  fontWeight: 600,
                  color: '#171717',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                }}
              >
                {Clock_Title}
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                height: '100%',
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
