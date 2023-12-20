import React from 'react';
import { Box, Typography } from '@mui/material';

import { RESOURCE_DATA } from '@/src/constants/resources';

const ResourceHeading = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: '25px', md: '30px' },
          fontWeight: 600,
        }}
      >
        {RESOURCE_DATA?.resource}
      </Typography>
      <br />
      <Typography
        sx={{
          fontSize: { xs: '16px', md: '14px' },
          fontWeight: 400,
        }}
      >
        {RESOURCE_DATA?.discoverAssets}
      </Typography>
      <br />
    </Box>
  );
};

export default ResourceHeading;
