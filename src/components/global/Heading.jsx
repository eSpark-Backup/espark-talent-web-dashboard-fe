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
          color: "#171717",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          mb:'20px'
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
          fontStyle: "normal",
          lineHeight: "normal",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default Heading;
