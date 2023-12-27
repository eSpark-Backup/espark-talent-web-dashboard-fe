import { Box, Typography } from '@mui/material';
import React from 'react';

const SettingTitle = ({ Setting_Data }) => {
  const { title, description } = Setting_Data;

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          width: { xs: '85%', sm: '80%' },
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Typography variant="h3" component={'h2'}>
          {title && title}
        </Typography>
        <Typography variant="p" component={'p'}>
          {description && description}
        </Typography>
      </Box>
    </>
  );
};

export default SettingTitle;
