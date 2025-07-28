import { Box, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { useSelector } from 'react-redux';

import TopNavNavbar from '@/src/components/global/TopNavbar';
import ResponsiveNavbar from '@/src/components/sidebar/ResponsiveNavbar';

import { SIDE_NAV_WIDTH } from '@/src/constants/sidebar';

import { Active_User_Data } from '@/src/data/user-data';

export const TopNav = ({ onNavOpen }) => {
  const { role } = useSelector((state) => state?.auth?.userData);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <>
      <Box
        component="header"
        sx={{
          height: 'auto',
          backdropFilter: 'blur(6px)',
          backgroundColor: () => alpha('#068987', 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: 500,
        }}
      >
        {lgUp && role === 'client' && <TopNavNavbar />}
        {!lgUp && (
          <ResponsiveNavbar
            userName={Active_User_Data?.userName}
            openSidebar={onNavOpen}
          />
        )}
      </Box>
    </>
  );
};
