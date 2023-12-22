import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import DotBadge from './SidebarProfileBadge';
import Image from 'next/image';

const SidebarProfileMenu = ({ profileMenuData }) => {
  const [profileMenu, setProfileMenu] = React.useState(null);

  const handleMenu = (event) => {
    setProfileMenu(event.currentTarget);
  };

  const handleClose = () => {
    setProfileMenu(null);
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
            onClick={handleClose}
            sx={{ width: '200px', py: 1.1 }}
          >
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Image src={item?.icon} width={20} height={20} alt="icon" />
              <Typography>{item?.text}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SidebarProfileMenu;
