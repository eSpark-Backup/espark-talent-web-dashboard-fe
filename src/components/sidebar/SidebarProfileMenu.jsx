import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DotBadge from '@/src/components/sidebar/SidebarProfileBadge';
import { Box } from '@mui/system';

const SidebarProfileMenu = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        '@media (min-width: 900px) and (max-width: 1199px)': {
          display: 'none',
        },
      }}
    >
      <DotBadge
        color={'#FF0000'}
        icon={<ArrowForwardIosIcon sx={{ width: '20px', height: '17px' }} />}
      />
    </Box>
  );
};

export default SidebarProfileMenu;
