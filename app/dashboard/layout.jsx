'use client';
import React from 'react';
import TopNav from '@/src/components/global/topNavbar';
import { Box } from '@mui/material';
import Sidebar from '@/src/components/sidebar/Sidebar';
import ResponsiveNavbar from '@/src/components/sidebar/ResponsiveNavbar';

const InnerPagesLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, width: 'auto' }}>
        <Box sx={{ width: '100%', height: { lg: '5.8vh', xl: '5.4vh' } }}>
          <TopNav />
          <ResponsiveNavbar userName={'Mohammad Ali'} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: { lg: '94.2vh', xl: '94.6vh' },
          }}
        >
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
              margin: 0,
              padding: 0,
              width: '100%',
              height: 'auto',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflowY: 'scroll',
                px: {
                  xs: '15px',
                  sm: '20px',
                  md: '20px',
                  lg: '30px',
                },
                py: { xs: '20px', sm: '20px', md: '20px', lg: '30px' },
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default InnerPagesLayout;
