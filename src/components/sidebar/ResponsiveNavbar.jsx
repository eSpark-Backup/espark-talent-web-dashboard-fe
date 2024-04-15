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
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [workspace, setWorkspace] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

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
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                    setProfileMenu={setProfileMenu}
                    setNotification={setNotification}
                    button={<WorkSpaceIcon image={WORK_SPACE_ICON} />}
                  />
                </Box>
              )}
              <Box sx={{ display: 'flex' }}>
                <SidebarGlobalIcon />
                <ProfilePopper
                  profileMenu={profileMenu}
                  setProfileMenu={setProfileMenu}
                  setWorkspace={setWorkspace}
                  notification={notification}
                  setNotification={setNotification}
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
