import React from 'react';
import { Box, Typography } from '@mui/material';

import { DASHBOARD_HEADER } from '@/app/constants/Dashboard';

const TopNav = () => {
  return (
    <Box
      sx={{
        background: '#029E9C;',
        padding: '15px',
        width: '100%',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {DASHBOARD_HEADER.globalHiring}
        <span
          style={{
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'underline',
          }}
        >
          {' '}
          {DASHBOARD_HEADER.callUs}
        </span>
      </Typography>
    </Box>
  );
};
export default TopNav;
