'use client';
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

import { COMPANY_ONBOARDING, HIRING_STATUS } from '@/src/constants/dashboard';
import CompanyProfile from './companyProfile';
import { ACTIVE_CLIENT } from '@/src/constants/data/client';

const OnBoarding = () => {
  return (
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
              height: { xs: '250px', md: '200px' },
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
              display: 'flex',
              padding: '18px',
              '@media (min-width: 900px) and (max-width: 1250px)': {
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
              height: { xs: '250px', md: '200px' },
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
              padding: '18px',
              '@media (min-width: 900px) and (max-width: 1250px)': {
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
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 400,
                    }}
                  >
                    {HIRING_STATUS.activeEmployee}:
                    <span style={{ fontSize: '14px' }}>
                      {ACTIVE_CLIENT?.hiringStatus.activeEmployees}
                    </span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 400,
                    }}
                  >
                    {HIRING_STATUS.onBoard}:
                    <span style={{ fontSize: '14px' }}>
                      {ACTIVE_CLIENT?.hiringStatus.onBoarded}
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
                    }}
                  >
                    {HIRING_STATUS.interviewSchedule}:
                    <span style={{ fontSize: '14px' }}>
                      {ACTIVE_CLIENT?.hiringStatus.onBoarded}
                    </span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      fontWeight: 400,
                    }}
                  >
                    {HIRING_STATUS.hiringReuqest}:
                    <span style={{ fontSize: '14px' }}>
                      {ACTIVE_CLIENT?.hiringStatus.hiringReuqests}
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
