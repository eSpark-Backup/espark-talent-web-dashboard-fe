import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DotBadge from './SidebarProfileBadge';

const SidebarProfileMenu = ({ profileMenuData }) => {
  const [profileMenu, setProfileMenu] = useState(null);
  const router = useRouter();

  const handleMenu = (event) => {
    setProfileMenu(event.currentTarget);
  };

  const handleClose = (text) => {
    setProfileMenu(null);
    if (text == 'Sign out') {
      router.push('/');
    } else {
      null;
    }
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onMouseOver={handleMenu}
        color="inherit"
      >
        <DotBadge
          color={'lightGreen'}
          icon={<ArrowForwardIosIcon sx={{ width: '20px', height: '20px' }} />}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={profileMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(profileMenu)}
        onClose={handleClose}
      >
        {profileMenuData?.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => handleClose(item?.text)}
            sx={{ width: '200px', py: 1.1 }}
          >
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <img
                src={item?.icon}
                style={{ width: '20px', height: '20px' }}
                alt="icon"
              />
              <Typography>{item?.text}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SidebarProfileMenu;
