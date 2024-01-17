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
import { useDispatch, useSelector } from 'react-redux';
import {
  handleProfileMenuClose,
  handleProfileMenuOpen,
} from '@/src/redux/slices/profileMenuSlice';
import { handleworkSpaceMenuClose } from '@/src/redux/slices/workSpaceMenuSlice';

export default function ProfilePopper({ button }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [notificationPopup, setNotificationPopup] = React.useState(null);
  const [bondary, setBondary] = React.useState(null);
  const notificationPopupRef = React.useRef(null);
  const router = useRouter();
  const isOpen = useSelector((state) => state?.profileMenu?.isOpen);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(handleProfileMenuOpen(isOpen ? null : event.currentTarget));
    dispatch(handleworkSpaceMenuClose(null));
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
    setBondary(document.querySelector('#popperBoundary'));
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotification = (event, key) => {
    dispatch(handleProfileMenuClose(null));
    if (key == 'Notification') {
      setNotificationPopup(notificationPopup ? null : event.currentTarget);
    } else if (key == 'Sign out') {
      setOpenModal(true);
    } else {
      null;
    }
  };

  const handlePopoverClose = () => {
    setNotificationPopup(null);
  };

  const handleLogout = () => {
    router.push('/');
  };

  const open = Boolean(isOpen);
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
        anchorEl={isOpen}
        placement={'right-start'}
        onMouseLeave={handlePopoverClose}
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
              <Box sx={{ display: 'flex', gap: 1.1 }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
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
        id={notificationId}
        open={notifiactionOpen}
        anchorEl={notificationPopupRef?.current}
        modifiers={[
          {
            name: 'preventOverflow',
            options: {
              boundary: `${bondary}`,
            },
          },
        ]}
        placement={'right-start'}
        sx={{ position: 'relative', zIndex: 505 }}
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
