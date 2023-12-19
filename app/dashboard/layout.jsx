'use client';
import React from 'react';
import TopNav from '@/src/components/global/topNavbar';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import Sidebar from '@/src/components/sidebar/Sidebar';
import SidebarToggle from '@/src/components/sidebar/SidebarToggle';

const InnerPagesLayout = ({ children }) => {
  const pathname = usePathname();
  React.useEffect(() => {
    if (pathname == '/dashboard*') {
      document.body.style.overflow = 'hidden';
    } else {
      null;
    }
  }, [pathname]);

  return (
    <>
      <Box sx={{ flexGrow: 1, width: 'auto' }}>
        <Box sx={{ width: '100%' }}>{/* <TopNav /> */}</Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              borderRight: '1px solid #E7E7E7',
              position: 'relative',
              background: ' #FFF',
              width: 'auto',
              height: 'auto',
              display: { xs: 'none', lg: 'flex', xl: 'flex' },
            }}
          >
            <Sidebar />
          </Box>
          <Box
            item
            xs={5}
            sx={{
              width: '100%',
              height: '100vh',
              px: { lg: '40px', xl: 0 },
              py: { lg: '40px', xl: 0 },
              padding: { xl: '20px', xxl: '20px' },
            }}
          >
            <Box sx={{ width: '100%', height: 'auto' }}>
              <TopNav />
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '95%',
                position: 'relative',
                overflowY: 'scroll',
              }}
            >
              <SidebarToggle />

              {children}
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default InnerPagesLayout;
