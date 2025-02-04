'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Fade, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import SidebarUserAvatar from '../sidebar/SidebarUserAvatar';
import { NOTIFICATION_TITLE, profileMenuData } from '@/src/constants/sidebar';
import SignoutModal from '../signoutmodal/signoutModal';
import DotBadge from '../sidebar/SidebarProfileBadge';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/src/redux/slices/authSlice';
import Cookie from 'js-cookie';
import { useMediaQuery } from '@mui/material';
import { removeClientHomeData } from '@/src/redux/slices/clientSlices/homeSlice';
import { removeHrData } from '@/src/redux/slices/hrSlices/homeSlice';
import { removeHrClientData } from '@/src/redux/slices/hrSlices/clientSlice';
import { removeHrEmployeeData } from '@/src/redux/slices/hrSlices/employeeSlice';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { GET_NOTIFICATIONS } from '@/src/services/apiService/apiEndPoints';
import { restructureNotificationData } from '@/src/utils/helpers';
import { getNotifications } from '@/src/redux/slices/notificationSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { notificationCases } from '@/src/utils/notificationCases';
dayjs.extend(relativeTime);

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
  const { data } = useSelector((state) => state?.notifications);
  const [openModal, setOpenModal] = React.useState(false);
  const [isFetchingNotifications, setIsFetchingNotifications] =
    React.useState(false);
  const userType = Cookie.get('userType');

  const handleClick = (event) => {
    setProfileMenu(profileMenu ? null : event?.currentTarget || undefined);
    setWorkspace(null);
  };

  const { refetch } = useQuery({
    queryKey: ['get-notifications'],
    queryFn: async () => {
      try {
        setIsFetchingNotifications(true);
        const { data } = await api.getData(GET_NOTIFICATIONS);
        // Dispatch the fetched notifications or an empty array if no data
        dispatch(getNotifications(data || []));
        setIsFetchingNotifications(false);
        return data || []; // Ensure the function always returns a value
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setIsFetchingNotifications(false);
        return []; // Return an empty array on error
      }
    },
  });

  const handleNotification = (event, key) => {
    if (key == 'Notifications') {
      setNotification(notification ? null : event?.currentTarget);
    } else if (key == 'Sign out') {
      setOpenModal(true);
      handleClickOutside();
    } else {
      null;
    }
  };

  const open = Boolean(profileMenu);
  const id = open ? 'simple-popper' : undefined;

  const Notification_open = Boolean(notification);
  const Notification_id = Notification_open ? 'simple-popper-1' : undefined;

  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const profile_placement = isLargeScreen ? 'right-start' : 'left-start';

  const handleClickOutside = (event) => {
    if (
      profilePopupRef?.current &&
      !profilePopupRef?.current?.contains(event?.target)
    ) {
      setProfileMenu(null);
    }
  };

  const handleClickOutsideNotification = (event) => {
    if (
      notificationPopupRef?.current &&
      !notificationPopupRef?.current?.contains(event?.target)
    ) {
      setNotification(null);
    }
  };

  React.useEffect(() => {
    document?.addEventListener('mousedown', handleClickOutsideNotification);
    document?.addEventListener('scroll', handleClickOutsideNotification);
    return () => {
      document?.removeEventListener(
        'mousedown',
        handleClickOutsideNotification
      );
      document?.removeEventListener('scroll', handleClickOutsideNotification);
    };
  }, [notification]);

  React.useEffect(() => {
    document?.addEventListener('click', handleClickOutside);
    document?.addEventListener('scroll', handleClickOutside);
    return () => {
      document?.removeEventListener('click', handleClickOutside);
      if (!window.scroll) {
        return document?.removeEventListener('scroll', handleClickOutside);
      }
    };
  }, [profileMenu]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeClientHomeData?.());
    dispatch(removeHrData?.());
    dispatch(removeHrClientData?.());
    dispatch(removeHrEmployeeData?.());
    Cookie?.remove('token');
    Cookie?.remove('userType');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    router?.replace('/');
    location?.reload();
    window?.history?.replaceState(null, '', '/');
  };

  const getTimePassedFromNow = (date, time) => {
    // Check if the time is in 12-hour or 24-hour format
    const is12HourFormat = /[0-9]{1,2}:[0-9]{2} [APMapm]{2}/.test(time);
    const formatString = is12HourFormat
      ? 'YYYY-MM-DD hh:mm A'
      : 'YYYY-MM-DD HH:mm';

    // Parse the date and time using the determined format
    const dateTime = dayjs(`${date} ${time}`, formatString);

    // Check if dateTime is valid
    if (!dateTime.isValid()) {
      console.error('Invalid date or time format', { date, time });
      return 'Invalid date or time';
    }

    const timeFromNow = dateTime?.fromNow();

    return timeFromNow;
  };
  return (
    <div>
      <button
        aria-describedby={id}
        type="button"
        onMouseEnter={(event) => handleClick(event)}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
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
        open={notification !== null ? true : open}
        ref={profilePopupRef}
        anchorEl={profileMenu || null}
        placement={profile_placement}
        sx={{ position: 'relative', zIndex: 405 }}
        transition
      >
        {({ TransitionProps }) => (
          <Fade
            {...TransitionProps}
            in={notification !== null ? true : open}
            timeout={400}
          >
            <Box
              ref={profilePopupRef}
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
                marginTop: { xs: 8, lg: 2 },
                '@media(max-width:1200px)': {
                  marginRight: -2,
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
                    ...(item?.text === 'Notifications' && {
                      borderBottom: '1px solid #E4E4E4',
                    }),
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1.7, px: 2 }}>
                    <Box sx={{ display: 'flex', gap: 0.1 }}>
                      <Box sx={{ marginTop: -1.2 }}>
                        {item?.text === 'Notifications' &&
                          data?.length !== 0 && <DotBadge color={'red'} />}
                      </Box>
                      <Image
                        width={20}
                        height={20}
                        src={item?.icon}
                        alt="icon"
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: `${item?.text === 'Sign out' ? '#DF1515' : '#595959'}`,
                      }}
                    >
                      {item?.text}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Box>
          </Fade>
        )}
      </Popper>

      <Popper
        id={Notification_id}
        open={Notification_open || false}
        ref={notificationPopupRef}
        onMouseLeave={handleCloseNotification}
        anchorEl={notification || false}
        placement={'bottom-start'}
        sx={{ position: 'relative', zIndex: 506 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} in={Notification_open} timeout={300}>
            <Box
              ref={notificationPopupRef}
              sx={{
                borderRadius: '5px',
                border: '1px solid #068987',
                background: '#FFF',
                boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
                display: 'flex',
                width: {
                  xs: '250px',
                  sm: `${restructureNotificationData(data)?.length === 0 ? '250px' : '350px'}`,
                },
                minHeight: 'auto',
                maxHeight: '410px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: {
                  xs: 1,
                  lg: -0.1,
                },
                marginTop: { xs: 9, lg: -6.3 },
                '@media(max-width:1200px)': {
                  marginTop: -6.5,
                  marginRight: -0.5,
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  px: 2.5,
                  py: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {NOTIFICATION_TITLE}
                </Typography>
                <Box
                  component={'img'}
                  width={20}
                  height={22}
                  alt="Refresh"
                  src={`/icons/Refresh.svg`}
                  className={`icon-refresh-${isFetchingNotifications ? 'play' : 'pause'}`}
                  id={'refresh-icon'}
                  onClick={refetch}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
              <Box sx={{ width: '100%', minHeight: '50px', overflowY: 'auto' }}>
                {restructureNotificationData(data)?.length > 0 ? (
                  <>
                    {restructureNotificationData(data)?.map((item, index) => (
                      <Box component={'div'} key={index}>
                        <Box
                          sx={{
                            width: '100%',
                            background: '#F5F5F5',
                            py: 1.6,
                            px: 2.5,
                            borderTop: '1px solid #E4E4E4',
                            borderBottom: '1px solid #E4E4E4',
                            '@media(max-width: 1200px)': {
                              width: '99.5%',
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, color: '#595959' }}
                          >
                            {item?.day}
                          </Typography>
                        </Box>
                        {item?.data?.map((notification, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: '99%',
                              display: { xs: 'none', sm: 'flex' },
                              flexDirection: { xs: 'row', sm: 'row' },
                              gap: { xs: 1, sm: 2 },
                              py: 3,
                              pl: { xs: 2.5, sm: 3.5 },
                              borderBottom: '1px solid #E4E4E4',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              handleClickOutsideNotification();
                              notificationCases(userType, notification);
                            }}
                          >
                            <Box>
                              <SidebarUserAvatar
                                userName={notification?.userName}
                              />
                            </Box>
                            <Box
                              sx={{
                                maxWidth: '180px',
                                minWidth: '180px',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: '#595959',
                                  pb: 0.5,
                                  maxWidth: '220px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {notification?.type}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: 400,
                                  color: '#595959',
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 3,
                                  overflow: 'hidden',
                                }}
                              >
                                {notification?.description}
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
                                {getTimePassedFromNow(
                                  notification?.date,
                                  notification?.time
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                        {item?.data?.map((notification, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: '100%',
                              display: { xs: 'block', sm: 'none' },
                              py: 3,
                              borderBottom: '1px solid #E4E4E4',
                            }}
                          >
                            <Box
                              sx={{
                                width: '100%',
                                display: 'flex',
                                pl: 3.5,
                                gap: 1.5,
                              }}
                            >
                              <Box>
                                <SidebarUserAvatar
                                  userName={notification?.userName}
                                />
                              </Box>
                              <Box
                                sx={{
                                  maxWidth: '180px',
                                  minWidth: '180px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 600,
                                    color: '#595959',
                                    pb: 0.5,
                                    maxWidth: '160px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {notification?.type}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '11px',
                                    fontWeight: 400,
                                    color: '#595959',
                                  }}
                                >
                                  {notification?.time}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ px: 3, pt: 1 }}>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: 400,
                                  color: '#595959',
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 3,
                                  overflow: 'hidden',
                                }}
                              >
                                {notification?.description}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </>
                ) : (
                  <Box
                    sx={{
                      width: '99%',
                      height: '100%',
                      background: '#F5F5F5',
                      py: 1.6,
                      px: 2.5,
                      borderTop: '1px solid #E4E4E4',
                    }}
                  >
                    No New Notification
                  </Box>
                )}
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
