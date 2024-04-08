import React from 'react';
import { Box, Typography } from '@mui/material';

import { employeeDataLabel } from '@/src/constants/employeeProfile';
import dayjs from 'dayjs';

const PersonalInformation = ({ data }) => {
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
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginRight: '80px',
            '@media (min-width: 900px) and (max-width: 1260px)': {
              marginRight: '20px',
              gap: '2px',
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
                {data?.label}
              </Typography>
            </>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            '@media (min-width: 900px) and (max-width: 1260px)': {
              gap: '5px',
            },
          }}
        >
          {employeeDataLabel?.map((empData, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 400,
                color: '#595959',
                '@media (min-width: 200px) and (max-width: 362px)': {
                  fontSize: '15px',
                },
                '@media (min-width: 1200px) and (max-width: 1300px)': {},
              }}
            >
              {empData?.type === 'date'
                ? dayjs(data?.[empData?.name]).format('DD/MM/YYYY')
                : data?.[empData?.name]}
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
        <Box
          sx={{
            marginRight: '0px',
            width: '50%',
            '@media (min-width: 500px) and (max-width: 900px)': {
              width: '30%',
            },
            background: '#fff',
          }}
        >
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
                {data?.label}
              </Typography>
            </>
          ))}
        </Box>

        <Box sx={{ width: '50%' }}>
          {employeeDataLabel?.map((data, index) => (
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
              {data?.value}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default PersonalInformation;
