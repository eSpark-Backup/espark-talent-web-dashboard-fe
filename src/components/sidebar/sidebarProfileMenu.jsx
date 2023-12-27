import React from 'react';

import { useRouter } from 'next/navigation';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DotBadge from './SidebarProfileBadge';

const SidebarProfileMenu = () => {
  // const [profileMenu, setProfileMenu] = React.useState(null);
  // const router = useRouter();

  // const handleMenu = (event) => {
  //   setProfileMenu(event.currentTarget);
  // };

  // const handleClose = (text) => {
  //   setProfileMenu(null);
  //   if (text == 'Sign out') {
  //     router.push('/');
  //   } else {
  //     null;
  //   }
  // };

  return (
    <>
      <DotBadge
        color={'lightGreen'}
        icon={<ArrowForwardIosIcon sx={{ width: '20px', height: '20px' }} />}
      />
    </>
  );
};

export default SidebarProfileMenu;
