'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import StartHiringForm from '@/src/components/StartHiring/StartHiringForm';

const StartHiring = () => {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} sm={9.125} md={9.125} lg={9.125}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: { xs: '50px', md: '15px' },
              '@media (min-width: 900px) and (max-width: 1240px)': {
                paddingTop: '50px',
              },
            }}
          >
            <StartHiringForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default StartHiring;
