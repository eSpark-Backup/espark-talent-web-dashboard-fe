import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const SidebarLogo = () => {
  return (
    <>
      <Box sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'center' }}>
        <Image
          src={'/images/sidebar-icons/logo.svg'}
          width={100}
          height={47}
          alt="image"
        />
      </Box>
    </>
  );
};

export default SidebarLogo;
