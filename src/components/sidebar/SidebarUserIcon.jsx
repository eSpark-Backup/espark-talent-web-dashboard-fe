import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const SidebarUserIcon = () => {
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
          // padding: 5
        }}
      >
        <Image
          src={'/images/sidebar-icons/internet-logo.svg'}
          width={25}
          height={25}
          alt="internet-logo"
        />
      </Box>
    </>
  );
};

export default SidebarUserIcon;
