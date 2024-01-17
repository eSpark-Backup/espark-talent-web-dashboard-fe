import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';

import SidebarUserAvatar from './SidebarUserAvatar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SidebarGlobalIcon from './SidebarGlobalIcon';
import ProfilePopper from '../popover/ProfilePopper';
import WorkSpacePopper from '../popover/WorkSpacePopper';
import { WORK_SPACE_ICON } from '@/src/constants/sidebar';
import WorkSpaceIcon from './WorkSpaceIcon';

export default function ResponsiveNavbar({ userName, openSidebar }) {
  const pathName = usePathname();
  const employee = pathName.includes('/employee/dashboard');

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

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {employee && (
                <Box
                  sx={{
                    width: '33px',
                    height: '32px',
                  }}
                >
                  <WorkSpacePopper
                    button={<WorkSpaceIcon image={WORK_SPACE_ICON} />}
                  />
                </Box>
              )}
              <Box sx={{ display: 'flex' }}>
                <SidebarGlobalIcon />
                <ProfilePopper
                  button={<SidebarUserAvatar userName={userName} />}
                />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
