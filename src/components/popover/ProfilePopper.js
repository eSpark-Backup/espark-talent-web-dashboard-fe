import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { MenuItem, Typography } from '@mui/material';
import SidebarProfileMenu from '../sidebar/sidebarProfileMenu';
import { SIDE_NAV_WIDTH, profileMenuData } from '@/src/constants/sidebar';
import NotificationPopper from './NotificationPopper';
import SidebarUserAvatar from '../sidebar/SidebarUserAvatar';

export default function ProfilePopper({ button }) {
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [notificationPopup, setNotificationPopup] = React.useState(null);
  const notificationPopupRef = React.useRef(null);

  const handleClick = (event) => {
    setProfileMenu(profileMenu ? null : event.currentTarget);
    setNotificationPopup(null);
  };

  const handleClickOutside = (event) => {
    if (
      notificationPopupRef.current &&
      !notificationPopupRef.current.contains(event.target)
    ) {
      setNotificationPopup(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotification = (event, key) => {
    setProfileMenu(null);
    if (key == 'Notification') {
      setNotificationPopup(notificationPopup ? null : event.currentTarget);
    }
    // else if (key == 'Sign out') {
    //   // sign out
    // }
    else{
      null;
    }
  };

  const handlePopoverClose = () => {
    setProfileMenu(null);
  };

  const open = Boolean(profileMenu);
  const id = open ? 'simple-popper-1' : undefined;

  const notifiactionOpen = Boolean(notificationPopup);
  const notificationId = notifiactionOpen ? 'simple-popper-2' : undefined;

  return (
    <div>
      <button
        aria-describedby={id}
        type="button"
        onMouseOver={handleClick}
        style={{ width: '100%', height: '100%' }}
      >
        {button}
      </button>

      <Popper
        id={id}
        open={open}
        anchorEl={profileMenu}
        placement={'right-start'}
        onMouseLeave={handlePopoverClose}
        sx={{ position: 'relative', zIndex: 2 }}
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
            marginLeft: 0.8,
            marginTop: 1,
          }}
        >
          {profileMenuData?.map((item, i) => (
            <MenuItem
              key={i}
              onClick={(e) => handleNotification(e, item?.text)}
              sx={{ width: '100%', py: 1.1 }}
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
        </Box>
      </Popper>

      <Popper
        id={notificationId}
        open={notifiactionOpen}
        anchorEl={notificationPopupRef.current}
        modifiers={[
          {
            name: 'preventOverflow',
            options: {
              boundary: document.querySelector('#popperBoundary'),
            },
          },
        ]}
        placement={'right-start'}
        sx={{ position: 'relative', zIndex: 2 }}
      >
        <Box
          ref={notificationPopupRef}
          sx={{
            borderRadius: '5px',
            border: '1px solid #068987',
            background: '#FFF',
            boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            width: '350px',
            height: '350px',
            overflowY: 'auto',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: 36,
            marginTop: 1,
          }}
        >
          <Box sx={{ width: '100%', padding: '15px 228px 16px 23px' }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                width: '100%',
                background: '#F5F5F5',
                padding: '11px 138px 12px 20px',
                borderTop: '1px solid #E4E4E4',
                borderBottom: '1px solid #E4E4E4',
              }}
            >
              <Typography>Today</Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: 3,
                px: 4,
                py: 2,
                borderBottom: '1px solid #E4E4E4',
              }}
            >
              <Box>
                <SidebarUserAvatar userName={'Muhammad Ali'} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: 700,
                    pb: 0.5,
                  }}
                >
                  Review Submitted Expense
                </Typography>
                <Typography variant="p">
                  A new expense was submitted by Arman khan
                </Typography>
              </Box>
              <Box>
                <Typography variant="p">Now</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                width: '100%',
                background: '#F5F5F5',
                padding: '11px 138px 12px 20px',
                borderTop: '1px solid #E4E4E4',
                borderBottom: '1px solid #E4E4E4',
              }}
            >
              <Typography>Today</Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: 3,
                px: 4,
                py: 2,
                borderBottom: '1px solid #E4E4E4',
              }}
            >
              <Box>
                <SidebarUserAvatar userName={'Muhammad Ali'} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: 700,
                    pb: 0.5,
                  }}
                >
                  Review Submitted Expense
                </Typography>
                <Typography variant="p">
                  A new expense was submitted by Arman khan
                </Typography>
              </Box>
              <Box>
                <Typography variant="p">Now</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                width: '100%',
                background: '#F5F5F5',
                padding: '11px 138px 12px 20px',
                borderTop: '1px solid #E4E4E4',
                borderBottom: '1px solid #E4E4E4',
              }}
            >
              <Typography>Today</Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: 3,
                px: 4,
                py: 2,
                borderBottom: '1px solid #E4E4E4',
              }}
            >
              <Box>
                <SidebarUserAvatar userName={'Muhammad Ali'} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: 700,
                    pb: 0.5,
                  }}
                >
                  Review Submitted Expense
                </Typography>
                <Typography variant="p">
                  A new expense was submitted by Arman khan
                </Typography>
              </Box>
              <Box>
                <Typography variant="p">Now</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popper>
    </div>
  );
}