import { Box } from '@mui/material';
import React from 'react';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <>
      <Box
        sx={{
          width: '280px',
          height: '95%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            position: 'relative',
            top: 0,
            width: '100%',
            height: '50px',
            padding: '12px',
          }}
        >
          Active Link
        </Box>
        <Box
          sx={{
            position: 'relative',
            px: '12px',
            pt: '60px',
          }}
        >
          <SidebarLink
            image={'/images/sidebar-icons/dashboard.svg'}
            text={'Dashboard'}
            link={'/dashboard'}
          />
          <SidebarLink
            image={'/images/sidebar-icons/hire.svg'}
            text={'Hire & Onboard'}
            link={'/dashboard/hire'}
          />
          <SidebarLink
            image={'/images/sidebar-icons/hire.svg'}
            text={'Hire & Onboard'}
            link={'dashboard/hire'}
          />
          <SidebarLink
            image={'/images/sidebar-icons/hire.svg'}
            text={'Hire & Onboard'}
            link={'/hire'}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#068987',
            position: 'absolute',
            height: '47px',
            bottom: 0,
          }}
        >
          Logo
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
