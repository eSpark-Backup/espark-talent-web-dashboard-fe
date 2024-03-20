import React from 'react';
import { Box, Typography } from '@mui/material';

import {
  emergencyContact,
  employeeProfileData,
} from '@/src/constants/employeeProfile';

const EmergencyContact = ({ data }) => {
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
          <Typography
            textAlign={'center'}
            fontSize={{ xs: '14px', md: '16px' }}
          >
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
            {emergencyContact?.map((contactData, index) => (
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
                {/* {contactData?.value} */}
                {data?.emergency_contact?.primary[contactData?.name]}
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
          <Typography
            textAlign={'center'}
            fontSize={{ xs: '14px', md: '16px' }}
          >
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
            {emergencyContact?.map((contactData, index) => (
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
                {contactData?.label}
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
            {emergencyContact?.map((contactData, index) => (
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
                {data?.emergency_contact?.secondary[contactData?.name]}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default EmergencyContact;
