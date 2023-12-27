import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import SidebarUserAvatar from '../sidebar/SidebarUserAvatar';
import { NOTIFICATION_TITLE, profileMenuData } from '@/src/constants/sidebar';
import { NOTIFICATION_DATA } from '@/src/constants/data/userData';
import SignoutModal from '../signoutmodal/signoutModal';

export default function ProfilePopper({ button }) {
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [notificationPopup, setNotificationPopup] = React.useState(null);
  const notificationPopupRef = React.useRef(null);
  const router = useRouter();
  const handleClick = (event) => {
    setProfileMenu(profileMenu ? null : event.currentTarget);
    setNotificationPopup(null);
  };

  const handleClickOutside = (event) => {
    if (
      notificationPopupRef?.current &&
      !notificationPopupRef?.current?.contains(event.target)
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
    } else if (key == 'Sign out') {
      setOpenModal(true);
    } else {
      null;
    }
  };

  const handlePopoverClose = () => {
    setProfileMenu(null);
  };

  const handleLogout = () => {
    router.push('/');
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
        onClick={handleClick}
        style={{ width: '100%', height: '100%' }}
      >
        {button}
      </button>
      <SignoutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onClick={handleLogout}
      />

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
            position: 'fixed',
            marginLeft: { xs: 'auto', lg: 0.8 },
            right: { xs: 0, lg: 'auto' },
            marginRight: { xs: 0, lg: 0 },
            marginTop: { xs: 8, lg: 1 },
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
        anchorEl={notificationPopupRef?.current}
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
            minHeight: 'auto',
            maxHeight: '410px',
            overflowY: 'auto',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'fixed',
            marginLeft: { xs: 1, lg: 36 },
            right: { xs: 0, lg: 'auto' },
            marginTop: { xs: 9, lg: 1 },
            marginRight: { xs: 1.5, lg: 'auto' },
            '@media (max-width: 374px)': {
              right: 0,
              left: 0,
              width: '310px',
              mx: 'auto',
            },
          }}
        >
          <Box sx={{ width: '100%', padding: '15px 228px 16px 23px' }}>
            <Typography variant="h6">{NOTIFICATION_TITLE}</Typography>
          </Box>
          <Box sx={{ width: '100%', height: '100%' }}>
            {NOTIFICATION_DATA?.map((item, index) => (
              <Box component={'div'} key={index}>
                <Box
                  sx={{
                    width: '100%',
                    background: '#F5F5F5',
                    padding: '11px 138px 12px 20px',
                    borderTop: '1px solid #E4E4E4',
                    borderBottom: '1px solid #E4E4E4',
                  }}
                >
                  <Typography>{item?.day}</Typography>
                </Box>
                {item?.userNotifications?.map((notification, index) => (
                  <Box
                    key={index}
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
                      <SidebarUserAvatar userName={notification?.userName} />
                    </Box>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: 700,
                          pb: 0.5,
                        }}
                      >
                        {notification?.userName}
                      </Typography>
                      <Typography variant="p">
                        {notification?.message}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="p">{notification?.time}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Popper>
    </div>
  );
}
