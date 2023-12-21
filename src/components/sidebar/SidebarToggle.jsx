import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Sidebar from './Sidebar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function SidebarToggle() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <React.Fragment>
        <MenuOpenIcon
          onClick={toggleDrawer('left', true)}
          sx={{
            color: 'white',
            fontSize: '37px',
            display: {
              xs: 'flex',
              sm: 'flex',
              md: 'flex',
              lg: 'none',
              xl: 'none',
            },
          }}
        />
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          <Sidebar />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
