'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import HiringForm from '@/src/components/starthiring/HiringForm';

const StartHiring = () => {
  return (
    <>
      <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={10} lg={10} >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '70px',
              width: '100%',
          }}
        >
          <HiringForm />
        </Box>
      </Grid>
    </Grid>
    </>
  );
};
export default StartHiring;
