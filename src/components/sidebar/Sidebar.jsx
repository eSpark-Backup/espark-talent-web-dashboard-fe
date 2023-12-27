import React from 'react';
import { Box, Button } from '@mui/material';

import SidebarAccordion from './SidebarAccordion';
import { IconsAndLinks } from '@/src/constants/sidebar';
import SidebarLogo from './sidebarLogo';
import SidebarActiveUser from './SidebarActiveUser';
import ProfilePopper from '../popover/ProfilePopper';
import NotificationPopper from '../popover/NotificationPopper';

const Sidebar = ({ userName }) => {
  return (
    <>
      <Box
        sx={{
          width: '280px',
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            width: '100%',
          }}
        >
          {/* <SidebarActiveUser userName={userName} /> */}
          {/* <NotificationPopper
            button={<SidebarActiveUser userName={userName} />}
          /> */}
          <ProfilePopper button={<SidebarActiveUser userName={userName} />} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box
            sx={{
              px: '12px',
              pt: '60px',
              pb: '60px',
              mb: '10px',
            }}
          >
            <SidebarAccordion sidebarLinks={IconsAndLinks} />
          </Box>
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#068987',
              alignSelf: 'flex-end',
            }}
          >
            <SidebarLogo />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
