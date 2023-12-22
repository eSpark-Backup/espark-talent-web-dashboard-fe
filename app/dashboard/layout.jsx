'use client';
import React from 'react';
import TopNav from '@/src/components/global/topNavbar';
import { Box } from '@mui/material';
import Sidebar from '@/src/components/sidebar/Sidebar';
import ResponsiveNavbar from '@/src/components/sidebar/ResponsiveNavbar';
import { ActiveUser } from '@/src/constants/sidebar';

const InnerPagesLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, width: 'auto' }}>
        <Box sx={{ width: '100%', height: { lg: '6.1vh' } }}>
          <TopNav />
          <ResponsiveNavbar userName={ActiveUser?.userName} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: { lg: '93.9vh' },
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
            <Sidebar userName={ActiveUser?.userName} />
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
