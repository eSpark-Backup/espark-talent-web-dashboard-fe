import Sidebar from './Sidebar';
import { Drawer, useMediaQuery } from '@mui/material';

import { Active_User_Data } from '@/src/constants/data/userData';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = <Sidebar userName={Active_User_Data?.userName} />;

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            width: 280,
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
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          overflowX: 'hidden',
          overflowY: 'hidden',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
