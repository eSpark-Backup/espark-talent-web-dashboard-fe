import React from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

import { DASHBOARD_DATA } from '@/src/constants/dashboard';

const DiscoverTalentPlatform = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        background: '#E6F5F4',
        justifyContent: 'space-around',
        alignItems: 'center',
        p: '50px',
        borderRadius: '5px',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        width: '100%',
        '@media (min-width: 900px) and (max-width: 1350px)': {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '680px',
          padding: { xs: '10px', md: '0px' },
          marginRight: { xs: '0px', md: '125px' },
          '@media (min-width: 900px) and (max-width: 1770px)': {
            marginLeft: '30px',
          },
        }}
      >
        <Typography
          sx={{
            color: '#068987',

            fontSize: { xs: '25px', md: '35px' },
            fontWeight: 700,
          }}
        >
          {DASHBOARD_DATA.talentPlatform}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '20px', md: '25px' },
            fontWeight: 400,
            color: '#595959',
          }}
        >
          {DASHBOARD_DATA.employeeData}
        </Typography>
      </Box>
      <Image
        src="/images/dashboard/rocket.svg"
        width={232}
        height={232}
        alt="rocket"
      />
    </Box>
  );
};
export default DiscoverTalentPlatform;
