import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SidebarToggle from './SidebarToggle';
import SidebarUserIcon from './SidebarUserIcon';
import SidebarUserAvatar from './SidebarUserAvatar';

export default function ResponsiveNavbar({ userName }) {
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
            <SidebarToggle userName={userName} />
            <Box sx={{ display: 'flex' }}>
              <SidebarUserIcon />
              <SidebarUserAvatar userName={userName} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
