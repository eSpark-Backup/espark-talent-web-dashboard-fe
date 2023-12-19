import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
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
        <Button
          onClick={toggleDrawer('left', true)}
          sx={{
            width: '60px',
            height: '60px',
            padding: '5px',
            borderRadius: '100%',
            zIndex: 2,
            right: '20px',
            bottom: '20px',
            backgroundColor: '#029E9C',
            position: 'fixed',
            display: {
              xs: 'flex',
              sm: 'flex',
              md: 'flex',
              lg: 'none',
              xl: 'none',
            },
            '&:hover': {
              backgroundColor: '#029E9C',
            },
          }}
        >
          <MenuOpenIcon sx={{ color: 'white' }} />
        </Button>

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
