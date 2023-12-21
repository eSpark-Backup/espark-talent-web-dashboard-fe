import React from 'react';
import { Box, Typography } from '@mui/material';

const Heading = ({ title, description }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: '25px', md: '30px' },
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <br />
      <Typography
        sx={{
          fontSize: { xs: '16px', md: '14px' },
          fontWeight: 400,
        }}
      >
        {description}
      </Typography>
      <br />
    </Box>
  );
};

export default Heading;
