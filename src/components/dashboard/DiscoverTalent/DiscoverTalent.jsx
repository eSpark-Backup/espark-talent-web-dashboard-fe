import React from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

import { DASHBOARD_DATA } from '@/app/constants/Dashboard';

const DiscoverTalentPlatform = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        background: '#E6F5F4',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '680px',
          padding: { xs: '10px', md: '0px' },
          marginTop: { xs: '20px', md: '10px' },
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
