import React from 'react';
import { Box, Typography } from '@mui/material';
import { DASHBOARD_HEADER } from '@/src/constants/dashboard';

const TopNavNavbar = () => {
  return (
    <Box
      sx={{
        padding: '22px',
        display: 'flex',
        height: '22px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        fill: '#029E9C',
      }}
    >
      <Typography
        sx={{
          color: '#FFF',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          width: '430px',
        }}
      >
        {DASHBOARD_HEADER.globalHiring}
        <span
          style={{
            color: '#FFF',

            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
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
