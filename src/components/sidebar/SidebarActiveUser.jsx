import React from 'react';

import { Box, Typography } from '@mui/material';

import SidebarUserAvatar from './SidebarUserAvatar';
import SidebarProfileMenu from './sidebarProfileMenu';
import SidebarGlobalIcon from './SidebarGlobalIcon';
import { profileMenuData } from '@/src/constants/sidebar';

const SidebarActiveUser = ({ userName }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SidebarGlobalIcon />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '70%',
          }}
        >
          <SidebarUserAvatar userName={userName} />
          <Typography sx={{ mx: 1.3 }}>{userName}</Typography>
        </Box>
        <SidebarProfileMenu profileMenuData={profileMenuData} />
      </Box>
    </>
  );
};

export default SidebarActiveUser;
