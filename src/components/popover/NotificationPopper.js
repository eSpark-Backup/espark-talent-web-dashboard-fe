import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
// import { profileMenuData } from '@/src/constants/sidebar';
import { Typography } from '@mui/material';
// import SidebarActiveUser from '../sidebar/SidebarActiveUser';
import SidebarUserAvatar from '../sidebar/SidebarUserAvatar';

export default function NotificationPopper({ button }) {
  const [notificationPopup, setNotificationPopup] = React.useState(null);

  const handleClick = (event) => {
    setNotificationPopup(notificationPopup ? null : event.currentTarget);
  };

  const handlePopoverClose = () => {
    setNotificationPopup(null);
  };

  const open = Boolean(notificationPopup);
  const id = open ? 'simple-popper' : undefined;

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

      <Popper
        id={id}
        open={open}
        anchorEl={notificationPopup}
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
            width: '350px',
            height: 'auto',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 0.8,
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
        </Box>
      </Popper>
    </div>
  );
}
