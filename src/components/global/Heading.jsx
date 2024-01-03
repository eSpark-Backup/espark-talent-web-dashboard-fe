import React from 'react';
import { Box, Typography } from '@mui/material';

const Heading = ({ title, description, containerStyles }) => {
  return (
    <Box
      sx={{
        ...containerStyles,
      }}
    >
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
          color: '#595959',
        }}
      >
        {description}
      </Typography>
      <br />
    </Box>
  );
};

export default Heading;
