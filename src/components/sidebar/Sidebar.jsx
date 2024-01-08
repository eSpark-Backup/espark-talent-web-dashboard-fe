'use client';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import SidebarAccordion from './SidebarAccordion';
import {
  Client_Routes,
  Employee_Routes,
  Hr_Routes,
} from '@/src/constants/sidebar';
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

  const renderLinks = () => {
    const client = pathName.includes('/client/dashboard');
    const employee = pathName.includes('/employee/dashboard');
    const hr = pathName.includes('/hr/dashboard');
    if (client) {
      return Client_Routes;
    } else if (employee) {
      return Employee_Routes;
    } else if (hr) {
      return Hr_Routes;
    } else {
      null;
    }
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
          <SidebarAccordion sidebarLinks={renderLinks()} />
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
