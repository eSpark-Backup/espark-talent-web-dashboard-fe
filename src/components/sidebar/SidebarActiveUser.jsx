import React from 'react';

import { Box, Typography } from '@mui/material';

import SidebarUserAvatar from './SidebarUserAvatar';
import SidebarProfileMenu from './sidebarProfileMenu';
import SidebarGlobalIcon from './SidebarGlobalIcon';

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
          py: 1.5,
          px: 1.2,
        }}
      >
        <SidebarGlobalIcon />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '72%',
          }}
        >
          <SidebarUserAvatar userName={userName} />
          <Typography variant="body1" sx={{ pl: 1.7, color: '#595959' }}>
            {userName}
          </Typography>
        </Box>
        <SidebarProfileMenu />
      </Box>
    </>
  );
};

export default SidebarActiveUser;
