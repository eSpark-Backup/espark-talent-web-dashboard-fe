import React from 'react';
import { Box, Typography } from '@mui/material';
import HiringDate from './HiringDate';
import GenderInput from './GenderInput';

const HiringForm = () => {
  return (
    <Box
      sx={{
        width: '750px',
        height: '900px',
        borderRadius: '10px',
        border: '1px solid #E4E4E4',
      }}
    >
      <GenderInput />
      <HiringDate />
    </Box>
  );
};
export default HiringForm;
