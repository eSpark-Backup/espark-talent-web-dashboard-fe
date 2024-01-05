import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

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
        <Image
          width={25}
          height={25}
          src={'/images/sidebar-icons/internet-logo.svg'}
          alt="internet-logo"
        />
      </Box>
    </>
  );
};

export default SidebarGlobalIcon;
