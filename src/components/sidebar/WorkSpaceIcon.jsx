import React from 'react';
import { Box } from '@mui/material';

const WorkSpaceIcon = ({ image }) => {
  return (
    <>
      <Box
        component={'img'}
        alt="work-space-icon"
        src={image}
        sx={{ width: '100%', height: '100%' }}
      />
    </>
  );
};

export default WorkSpaceIcon;
