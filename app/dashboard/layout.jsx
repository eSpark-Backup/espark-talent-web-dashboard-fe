'use client';
import React from 'react';
import TopNav from '@/src/components/global/topNavbar';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import Sidebar from '@/src/components/sidebar/Sidebar';

const InnerPagesLayout = ({ children }) => {
  const pathname = usePathname();
  React.useEffect(() => {
    if (pathname == '/dashboard') {
      document.body.style.overflow = 'hidden';
    } else {
      null;
    }
  }, [pathname]);

  return (
    <>
      <Box sx={{ flexGrow: 1, width: 'auto' }}>
        <Box sx={{ width: '100%', backgroundColor: 'red' }}>
          <TopNav />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              borderRight: '1px solid #E7E7E7',
              background: ' #FFF',
              width: 'auto',
              height: '100vh',
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
              padding: { xl: '30px', xxl: '50px' },
            }}
          >
            <Box sx={{ width: '100%', height: '240px' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default InnerPagesLayout;
