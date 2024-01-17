import React from 'react';

import { Box, Typography } from '@mui/material';
import SidebarProfileMenu from './sidebarProfileMenu';
import WorkSpaceIcon from './WorkSpaceIcon';

const SidebarWorkSpace = ({ title, image }) => {
  return (
    <>
      <Box
        component={'button'}
        sx={{
          width: '100%',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.9,
          px: 1.2,
        }}
      >
        <Box sx={{ pl: 0.1, width: '34px', height: '34px' }}>
          <WorkSpaceIcon image={image} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 0.3,
            width: '54%',
          }}
        >
          <Typography variant="body1" sx={{ color: '#595959' }}>
            {title}
          </Typography>
        </Box>
        <SidebarProfileMenu />
      </Box>
    </>
  );
};

export default SidebarWorkSpace;
