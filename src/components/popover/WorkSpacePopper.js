'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { MenuItem, Typography } from '@mui/material';
import Image from 'next/image';

import { Work_Space_Menu_Data } from '@/src/constants/sidebar';
export default function WorkSpacePopper({
  button,
  workspace,
  setWorkspace,
  setProfileMenu,
  setNotification,
}) {
  const workspacePopupRef = React.useRef(null);

  const handleClick = (event) => {
    setWorkspace(event?.currentTarget);
    setProfileMenu(null);
    setNotification(null);
  };

  const open = Boolean(workspace);
  const id = open ? 'simple-popper' : undefined;

  const handleClickOutside = (event) => {
    if (
      workspacePopupRef?.current &&
      !workspacePopupRef?.current?.contains(event.target)
    ) {
      setWorkspace(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mouseleave', handleClickOutside);
    return () => {
      document.removeEventListener('mouseleave', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setWorkspace(null);
  };

  return (
    <div>
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleClick}
        style={{ width: '100%', height: '100%' }}
      >
        {button}
      </button>
      <Popper
        id={id}
        open={open}
        ref={workspacePopupRef}
        onMouseLeave={handleClose}
        anchorEl={workspace}
        placement={'right-start'}
        sx={{ position: 'relative', zIndex: 505 }}
      >
        <Box
          sx={{
            borderRadius: '5px',
            border: '1px solid #068987',
            background: '#FFF',
            boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            width: '220px',
            height: '100px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'fixed',
            marginLeft: { xs: 'auto', lg: 0.8 },
            right: { xs: 0, lg: 'auto' },
            marginRight: { xs: 0, lg: 0 },
            marginTop: { xs: 8, lg: 1 },
            '@media(max-width:1200px)': {
              marginRight: -9,
            },
          }}
        >
          {Work_Space_Menu_Data?.map((item, i) => (
            <MenuItem
              key={i}
              // onClick={handleWorkSpace}
              sx={{
                width: '100%',
                py: 1.1,
                '&: hover': { backgroundColor: 'transparent' },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: 1.1,
                  justifyContent: 'center',
                }}
              >
                {item?.icon && (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Image width={20} height={20} src={item?.icon} alt="icon" />
                  </Box>
                )}

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    color: '#595959',
                  }}
                >
                  {item?.text}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Popper>
    </div>
  );
}
