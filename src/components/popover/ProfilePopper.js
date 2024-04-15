'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import SidebarUserAvatar from '../sidebar/SidebarUserAvatar';
import { NOTIFICATION_TITLE, profileMenuData } from '@/src/constants/sidebar';
import { NOTIFICATION_DATA } from '@/src/constants/data/userData';
import SignoutModal from '../signoutmodal/signoutModal';
import DotBadge from '../sidebar/SidebarProfileBadge';
import { useDispatch } from 'react-redux';
import { logout } from '@/src/redux/slices/authSlice';
import Cookie from 'js-cookie';
import { useMediaQuery } from '@mui/material';

export default function ProfilePopper({
  button,
  profileMenu,
  setProfileMenu,
  setWorkspace,
  notification,
  setNotification,
}) {
  const profilePopupRef = React.useRef(null);
  const notificationPopupRef = React.useRef(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setProfileMenu(event?.currentTarget);
    setWorkspace(null);
  };

  const handleNotification = (event, key) => {
    if (key == 'Notification') {
      setNotification(notification ? null : event.currentTarget);
    } else if (key == 'Sign out') {
      setOpenModal(true);
    } else {
      null;
    }
  };

  const open = Boolean(profileMenu);
  const id = open ? 'simple-popper' : undefined;

  const Notification_open = Boolean(notification);
  const Notification_id = Notification_open ? 'simple-popper' : undefined;

  const handleClickOutside = (event) => {
    if (
      profilePopupRef?.current &&
      !profilePopupRef?.current?.contains(event.target)
    ) {
      setProfileMenu(null);
    }
  };

  const handleClickOutsideNotification = (event) => {
    if (
      notificationPopupRef?.current &&
      !notificationPopupRef?.current?.contains(event.target)
    ) {
      setNotification(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mouseleave', handleClickOutsideNotification);
    return () => {
      document.removeEventListener(
        'mouseleave',
        handleClickOutsideNotification
      );
    };
  }, []);

  React.useEffect(() => {
    document.addEventListener('mouseleave', handleClickOutside);
    return () => {
      document.removeEventListener('mouseleave', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setProfileMenu(null);
    setNotification(null);
  };

  const handleCloseNotification = () => {
    setNotification(null);
    setProfileMenu(null);
  };

  const [openModal, setOpenModal] = React.useState(false);

  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    Cookie?.remove('token');
    Cookie?.remove('userType');
    router?.replace('/');
    location?.reload();
  };

  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const profile_placement = isLargeScreen ? 'right-start' : 'left-start';

  return (
    <div>
      <button
        aria-describedby={id}
        type="button"
        onMouseEnter={(event) => handleClick(event)}
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
        open={profileMenu}
        ref={profilePopupRef}
        onClose={handleClose}
        onMouseLeave={notification == null ? handleClose : null}
        anchorEl={profileMenu}
        placement={profile_placement}
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
              marginRight: -4,
            },
          }}
        >
          {profileMenuData?.map((item, i) => (
            <MenuItem
              key={i}
              onClick={(e) => handleNotification(e, item?.text)}
              sx={{
                width: '100%',
                py: 1.1,
                '&: hover': { backgroundColor: 'transparent' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.7 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ marginTop: -1.2 }}>
                    {item?.text == 'Notification' && <DotBadge color={'red'} />}
                  </Box>
                  <Image width={20} height={20} src={item?.icon} alt="icon" />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: `${
                      item?.text == 'Sign out' ? '#DF1515' : '#595959'
                    }`,
                  }}
                >
                  {item?.text}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Popper>

      <Popper
        id={Notification_id}
        open={Notification_open}
        ref={notificationPopupRef}
        onMouseLeave={handleCloseNotification}
        anchorEl={notification}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{ position: 'relative', zIndex: 506 }}
      >
        <Box
          ref={notificationPopupRef}
          sx={{
            borderRadius: '5px',
            border: '1px solid #068987',
            background: '#FFF',
            boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            maxWidth: { xs: '270px', sm: '350px' },
            minHeight: 'auto',
            maxHeight: '410px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: { xs: 1, lg: 16 },
            marginTop: { xs: 9, lg: -6.5 },
            '@media(max-width:1200px)': {
              marginTop: -7,
              marginRight: 0.7,
            },
          }}
        >
          <Box sx={{ width: '100%', padding: '15px 228px 16px 23px' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {NOTIFICATION_TITLE}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
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
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: '#595959' }}
                  >
                    {item?.day}
                  </Typography>
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
                        variant="body1"
                        sx={{ fontWeight: 600, color: '#595959', pb: 0.5 }}
                      >
                        {notification?.userName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#595959',
                        }}
                      >
                        {notification?.message}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#595959',
                        }}
                      >
                        {notification?.time}
                      </Typography>
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
