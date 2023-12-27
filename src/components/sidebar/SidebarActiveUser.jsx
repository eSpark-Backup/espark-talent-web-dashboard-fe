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
        component={'button'}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          py: 2,
          px: 1.2,
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
        <SidebarProfileMenu />
      </Box>
    </>
  );
};

export default SidebarActiveUser;
