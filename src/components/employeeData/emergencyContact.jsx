import React from 'react';
import { Box, Typography } from '@mui/material';

import {
  emergencyContact,
  employeeProfileData,
} from '@/src/constants/employeeProfile';

const EmergencyContact = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      padding={2}
      gap={0.5}
      marginLeft={{
        xs: '0px',
        md: '22px',
        '@media (min-width: 900px) and (max-width: 1640px)': {
          paddingLeft: '1px',
        },
      }}
    >
      <Box
        sx={{
          borderRadius: '5px',
          border: '1px solid #E4E4E4',
          width: { xs: '100%', md: '92%' },
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E4E4E4', padding: '10px' }}>
          <Typography textAlign={'center'}>
            {employeeProfileData?.primary}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '12px',
            gap: { xs: '10px', md: '40px' },
            '@media (min-width: 200px) and (max-width: 362px)': {
              gap: '7px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '7px',
              flexDirection: 'column',
            }}
          >
            {emergencyContact?.map((data, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  '@media (min-width: 200px) and (max-width: 362px)': {
                    fontSize: '9px',
                  },
                }}
              >
                {data?.label}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              flexDirection: 'column',
            }}
          >
            {emergencyContact?.map((data, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  '@media (min-width: 200px) and (max-width: 362px)': {
                    fontSize: '9px',
                  },
                }}
              >
                {data?.value}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: '5px',
          border: '1px solid #E4E4E4',
          width: { xs: '100%', md: '92%' },
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E4E4E4', padding: '10px' }}>
          <Typography textAlign={'center'}>
            {employeeProfileData?.secondary}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '10px',
            gap: { xs: '10px', md: '40px' },
            '@media (min-width: 200px) and (max-width: 362px)': {
              gap: '7px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              flexDirection: 'column',
            }}
          >
            {emergencyContact?.map((data, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  '@media (min-width: 200px) and (max-width: 362px)': {
                    fontSize: '9px',
                  },
                }}
              >
                {data?.label}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              flexDirection: 'column',
            }}
          >
            {emergencyContact?.map((data, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  '@media (min-width: 200px) and (max-width: 362px)': {
                    fontSize: '9px',
                  },
                }}
              >
                {data?.value}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default EmergencyContact;
