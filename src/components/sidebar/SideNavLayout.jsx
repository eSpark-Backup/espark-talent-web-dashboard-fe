import Sidebar from './Sidebar';
import { Backdrop, Drawer, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

export const SideNav = (props) => {
  const { empDetails, role } = useSelector((state) => state?.auth?.userData);
  const { data } = useSelector((state) => state?.client?.home);
  const { homeData } = useSelector((state) => state?.hr?.home);
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Sidebar
      userName={
        role === 'client'
          ? data?.username
          : role === 'employee'
            ? empDetails?.employee_name
            : homeData?.user
      }
    />
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            width: 280,
            marginTop: role === 'client' ? '44px' : '0px',
            overflowX: 'hidden',
            overflowY: 'hidden',
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      disableScrollLock
      disableEnforceFocus
      disableRestoreFocus
      disableAutoFocus
      anchor="left"
      onClose={onClose}
      open={open}
      ModalProps={{ keepMounted: true }}
      BackdropComponent={(props) => (
        <Backdrop {...props} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} />
      )}
      PaperProps={{
        sx: {
          marginTop: '58px',
          overflowX: 'hidden',
          overflowY: 'hidden',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme?.zIndex?.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
