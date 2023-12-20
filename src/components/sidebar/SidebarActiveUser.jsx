import React from 'react';
import SidebarUserIcon from './SidebarUserIcon';
import SidebarUserAvatar from './SidebarUserAvatar';
import SidebarProfileMenu from './sidebarProfileMenu';
import { profileMenuData } from '@/src/constants/sidebar';
import { Box, Typography } from '@mui/material';

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
        <SidebarUserIcon />
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
