import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

const SidebarProfileMenu = () => {
  //   const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <ArrowForwardIosIcon sx={{ width: '17px', height: '17px' }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} sx={{ width: '200px', py: 1.1 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <NotificationsIcon sx={{ width: '20px', height: '20px' }} />
            <Typography>Notification</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '200px', py: 1.1 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <LogoutIcon sx={{ width: '20px', height: '20px' }} />
            <Typography>Sign out</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SidebarProfileMenu;
