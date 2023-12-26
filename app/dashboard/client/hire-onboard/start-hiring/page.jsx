'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import HiringForm from '@/src/components/starthiring/HiringForm';

const StartHiring = () => {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: { xs: '80px', md: '30px' },
              '@media (min-width: 900px) and (max-width: 1240px)': {
                paddingTop: '50px',
              },
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
