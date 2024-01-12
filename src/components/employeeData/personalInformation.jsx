import React from 'react';
import { Box, Typography } from '@mui/material';

import {
  employeeData,
  employeeDataLabel,
} from '@/src/constants/employeeProfile';

const PersonalInformation = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            marginRight: '80px',
            '@media (min-width: 900px) and (max-width: 1260px)': {
              marginRight: '20px',
            },
          }}
        >
          {employeeDataLabel?.map((data, index) => (
            <>
              <Typography
                key={index}
                sx={{
                  fontSize: { xs: '12px', md: '16px' },
                  color: '#171717',
                  fontWeight: 400,
                  '@media (min-width: 200px) and (max-width: 362px)': {
                    fontSize: '15px',
                  },
                }}
              >
                {data.label}
              </Typography>
            </>
          ))}
        </Box>

        <Box>
          {employeeData?.map((data, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 400,
                color: '#595959',
                '@media (min-width: 200px) and (max-width: 362px)': {
                  fontSize: '15px',
                },
              }}
            >
              {data.value}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* //for mobile */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'row',
          width: '100%',
          '@media (min-width: 280px) and (max-width: 350px)': {
            padding: '10px',
          },
        }}
      >
        <Box sx={{ marginRight: '0px', width: '50%' }}>
          {employeeDataLabel.map((data, index) => (
            <>
              <Typography
                key={index}
                sx={{
                  fontSize: '13px',
                  color: '#171717',
                  fontWeight: 400,
                  '@media (min-width: 200px) and (max-width: 362px)': {
                    fontSize: '11px',
                  },
                }}
              >
                {data.label}
              </Typography>
            </>
          ))}
        </Box>

        <Box sx={{ width: '50%' }}>
          {employeeData?.map((data, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '13px',
                color: '#595959',
                fontWeight: 400,
                '@media (min-width: 200px) and (max-width: 362px)': {
                  fontSize: '11px',
                },
              }}
            >
              {data.value}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default PersonalInformation;
