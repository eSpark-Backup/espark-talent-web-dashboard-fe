import { Box, Typography } from '@mui/material';
import React from 'react';

export const renderTrackingStatus = ({
  statusIndex,
  label,
  background,
  shortForm,
}) => {
  return (
    <Box display={'flex'} alignItems={'center'} key={statusIndex}>
      <Box
        sx={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background,
          color: '#fff',
        }}
        display={'flex'}
        fontSize={'12px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {shortForm}
      </Box>
      <Typography variant="caption" marginX={'10px'}>
        {label}
      </Typography>
    </Box>
  );
};
