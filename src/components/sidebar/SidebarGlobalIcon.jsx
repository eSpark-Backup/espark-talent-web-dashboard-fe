import React from 'react';
import { Box } from '@mui/material';

const SidebarGlobalIcon = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#e6f5f4',
          border: '1px solid #029E9C',
          borderRadius: '100%',
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={'/images/sidebar-icons/internet-logo.svg'}
          style={{ width: '25px', height: '25px' }}
          alt="internet-logo"
        />
      </Box>
    </>
  );
};

export default SidebarGlobalIcon;
