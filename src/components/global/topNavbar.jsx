import React from 'react';
import { Box, Typography } from '@mui/material';

import { DASHBOARD_HEADER } from '@/src/constants/dashboard';

const TopNavNavbar = () => {
  return (
    <Box
      sx={{
        background: '#029E9C;',
        margin: 0,
        padding: '15px',
        height: 'auto',
        width: '100%',
        display: { xs: 'none', lg: 'flex', xl: 'flex' },
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          mx: 'auto',
          color: '#FFF',

          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {DASHBOARD_HEADER.globalHiring}
        <span
          style={{
            color: '#FFF',

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
export default TopNavNavbar;
