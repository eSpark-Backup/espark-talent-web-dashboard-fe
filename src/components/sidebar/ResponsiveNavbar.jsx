import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SidebarUserAvatar from './SidebarUserAvatar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SidebarGlobalIcon from './SidebarGlobalIcon';

export default function ResponsiveNavbar({ userName, openSidebar }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: 'auto',
        display: { xs: 'flex', lg: 'none', xl: 'none' },
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <MenuOpenIcon
              onClick={openSidebar}
              sx={{
                color: 'white',
                fontSize: '37px',
                display: {
                  xs: 'flex',
                  sm: 'flex',
                  md: 'flex',
                  lg: 'none',
                  xl: 'none',
                },
              }}
            />
            <Box sx={{ display: 'flex' }}>
              <SidebarGlobalIcon />
              <SidebarUserAvatar userName={userName} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
