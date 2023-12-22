import { Box } from '@mui/material';
import React from 'react';
import SidebarAccordion from './SidebarAccordion';
import { IconsAndLinks } from '@/src/constants/sidebar';
import SidebarLogo from './sidebarLogo';
import SidebarActiveUser from './SidebarActiveUser';

const Sidebar = ({ userName }) => {
  return (
    <>
      <Box
        sx={{
          width: '280px',
          // height: '100vh',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            position: 'relative',
            top: 0,
            width: '100%',
            px: '12px',
          }}
        >
          <SidebarActiveUser userName={userName} />
        </Box>
        <Box
          sx={{
            position: 'relative',
            px: '12px',
            pt: '60px',
          }}
        >
          <SidebarAccordion sidebarLinks={IconsAndLinks} />
        </Box>
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#068987',
            position: 'absolute',
            bottom: 0,
          }}
        >
          <SidebarLogo />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
