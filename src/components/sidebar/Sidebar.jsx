'use client';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import SidebarAccordion from './SidebarAccordion';
import { Client_Routes, Employee_Routes } from '@/src/constants/sidebar';
import SidebarLogo from './sidebarLogo';
import SidebarActiveUser from './SidebarActiveUser';
import ProfilePopper from '../popover/ProfilePopper';
import { usePathname } from 'next/navigation';

const Sidebar = ({ userName }) => {
  const theme = useTheme();
  const pathName = usePathname();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

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
          {isSmallScreen ? (
            <SidebarActiveUser userName={userName} />
          ) : (
            <ProfilePopper button={<SidebarActiveUser userName={userName} />} />
          )}
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
            <SidebarAccordion
              sidebarLinks={
                pathName.includes('/client/dashboard')
                  ? Client_Routes
                  : null || pathName.includes('/employee/dashboard')
                  ? Employee_Routes
                  : null || pathName.includes('/hr/dashboard')
                // ? Hr_Routes
                // : null
              }
            />
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
