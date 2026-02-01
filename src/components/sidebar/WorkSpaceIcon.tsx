import React from 'react';
import { Box } from '@mui/material';

const WorkSpaceIcon = ({ image }) => {
  return (
    <>
      <Box
        component={'img'}
        alt="work-space-icon"
        src={image}
        sx={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          maxWidth: '120px',
          marginTop: '-4px',
          marginRight: '7px',
          marginLeft: '10px',
        }}
      />
    </>
  );
};

export default WorkSpaceIcon;
