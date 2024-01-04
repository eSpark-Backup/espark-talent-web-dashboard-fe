'use client';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import SidebarAccordion from './SidebarAccordion';
import { Client_Routes, Employee_Routes, Hr_Routes } from '@/src/constants/sidebar';
import SidebarLogo from './sidebarLogo';
import SidebarActiveUser from './SidebarActiveUser';
import ProfilePopper from '../popover/ProfilePopper';
import { usePathname } from 'next/navigation';

const Sidebar = ({ userName }) => {
  const theme = useTheme();
  const pathName = usePathname();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const accordionStyles = {
    paddingTop: windowHeight < 300 ? 0 : '15%',
    paddingBottom: windowHeight < 300 ? 0 : '15%',
  };

  return (
    <>
      <Box
        sx={{
          width: '280px',
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          backgroundColor: '#fff',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            position: 'relative',
            width: '100%',
          }}
        >
          {isSmallScreen ? (
            <SidebarActiveUser userName={userName} />
          ) : (
            <ProfilePopper button={<SidebarActiveUser userName={userName} />} />
          )}
        </Box>
        <Box
          id={'accrodion'}
          component={'div'}
          sx={{
            px: '12px',
            top: 0,
            height: '100%',
            ...accordionStyles,
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <SidebarAccordion
            sidebarLinks={
              pathName.includes('/client/dashboard')
                ? Client_Routes
                : null || pathName.includes('/employee/dashboard')
                ? Employee_Routes
                : null || pathName.includes('/hr/dashboard')
              ? Hr_Routes
               : null 
            }
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            bottom: 0,
            backgroundColor: '#068987',
          }}
        >
          <SidebarLogo />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
