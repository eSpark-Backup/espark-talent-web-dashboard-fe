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
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            width: '100%',
            px: '12px',
          }}
        >
          <SidebarActiveUser userName={userName} />
        </Box>
        <Box
          sx={{
            px: '12px',
            pt: '60px',
            pb: '60px',
            mb: '10px',
            height: '100%',
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
    </>
  );
};

export default Sidebar;
