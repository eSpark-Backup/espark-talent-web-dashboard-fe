'use client';
import React from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { COMPANY_ONBOARDING, HIRING_STATUS } from '@/src/constants/dashboard';
import CompanyProfile from './companyProfile';
import { useSelector } from 'react-redux';

const OnBoarding = ({ isLoading }) => {
  const { data } = useSelector((state) => state?.client?.home);
  // const dispatch = useDispatch();
  // const { isLoading } = useQuery({
  //   // staleTime: 10000,
  //   queryFn: () => {
  //     dispatch(fetchClientHomeDataRequest());
  //     return api
  //       .getData(`${CLIENT_HOME}`)
  //       .then(({ data }) => {
  //         dispatch(fetchClientHomeDataRequestSuccess(data));
  //         return data;
  //       })
  //       .catch((err) => {
  //         dispatch(fetchClientHomeDataRequestFailed());
  //         console.log({ err });
  //       });
  //   },
  // });
  // if (isLoading) return 'Loading...';
  return isLoading ? (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'row' }}
      gap="12px"
      width="100%"
      justifyContent="space-between"
    >
      <Stack
        sx={{
          height: { xs: '270px', md: '200px' },
          borderRadius: '10px',
          background: '#FFF',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
          display: 'flex',
          padding: '18px',
          '@media (min-width: 900px) and (max-width: 1350px)': {
            height: '250px',
          },
          width: { xs: '100%', md: '50%' },
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '10px',
            width: '90%',
            padding: '15px',
          }}
        >
          <Skeleton
            variant="text"
            sx={{ width: { xs: '80%', md: '70%' }, height: '20px' }}
          />
          <Skeleton
            variant="text"
            sx={{ width: { xs: '80%', md: '100%' }, height: '20px' }}
          />
          <Skeleton
            variant="text"
            sx={{ width: { xs: '80%', md: '100%' }, height: '20px' }}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          display: 'flex',
          height: { xs: '270px', md: '200px' },
          borderRadius: '10px',
          background: '#fff',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
          padding: '18px',
          '@media (min-width: 900px) and (max-width: 1350px)': {
            height: '250px',
          },
          width: { xs: '100%', md: '50%' },
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '20px',
            width: '90%',
            gap: '15px',
          }}
        >
          <Skeleton variant="text" width="150px" />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Skeleton
                variant="text"
                sx={{
                  width: { xs: '90px', md: '150px' },
                  height: '20px',
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  width: { xs: '90px', md: '150px' },
                  height: '20px',
                }}
              />
            </Stack>
            <Stack
              sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Skeleton
                variant="text"
                sx={{ width: { xs: '90px', md: '150px' }, height: '20px' }}
              />
              <Skeleton
                variant="text"
                sx={{ width: { xs: '90px', md: '150px' }, height: '20px' }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Grid container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: '12px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: { xs: '270px', md: '200px' },
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
              display: 'flex',
              padding: '18px',
              '@media (min-width: 900px) and (max-width: 1350px)': {
                height: '250px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '10px',
                width: '90%',
                padding: '15px',
              }}
            >
              <Typography
                sx={{
                  color: '#171717',

                  fontSize: { xs: '20px', md: '25px' },
                  fontWeight: 600,
                }}
              >
                {' '}
                {COMPANY_ONBOARDING.companyOnboarding}
              </Typography>
              <CompanyProfile />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              height: { xs: '270px', md: '200px' },
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
              padding: '18px',
              '@media (min-width: 900px) and (max-width: 1350px)': {
                height: '250px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '20px',
                width: '90%',
                gap: '15px',
              }}
            >
              <Typography
                sx={{
                  color: '#171717',

                  fontSize: { xs: '20px', md: '25px' },
                  fontWeight: 600,
                }}
              >
                {' '}
                {HIRING_STATUS.status}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    '@media (min-width: 280px) and (max-width: 340px)': {
                      mb: '11px',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    {HIRING_STATUS.activeEmployee}:
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#595959',
                        marginLeft: '5px',
                      }}
                    >
                      {data?.active_employee}
                    </span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      color: '#595959',
                      fontWeight: 400,
                    }}
                  >
                    {HIRING_STATUS.onBoard}:
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        marginLeft: '5px',
                      }}
                    >
                      {data?.onboarding_count}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    marginLeft: { xs: '8px', md: '0px' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    {HIRING_STATUS.interviewSchedule}:
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#595959',
                        marginLeft: '5px',
                      }}
                    >
                      {data?.interview_schedule_count}
                    </span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    {HIRING_STATUS.hiringReuqest}:
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#595959',
                        marginLeft: '5px',
                      }}
                    >
                      {data?.hiring_request_count}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default OnBoarding;
