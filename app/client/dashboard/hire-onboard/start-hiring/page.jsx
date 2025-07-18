'use client';
import React from 'react';
import { Box } from '@mui/material';

import StartHiringForm from '@/src/components/start-hiring/StartHiringForm';

const StartHiring = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StartHiringForm />
      </Box>
    </>
  );
};
export default StartHiring;
