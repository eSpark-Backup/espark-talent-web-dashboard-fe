import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DotBadge from './SidebarProfileBadge';

const SidebarProfileMenu = () => {
  return (
    <>
      <DotBadge
        color={'#FF0000'}
        icon={<ArrowForwardIosIcon sx={{ width: '20px', height: '20px' }} />}
      />
    </>
  );
};

export default SidebarProfileMenu;
