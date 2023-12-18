'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import HiringForm from '@/src/components/StartHiring/HiringForm';



const StartHiring = () => {
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '60px',
            width: '100%',
            
          }}
              >
                  <HiringForm/>
        </Box>
      </Grid>
    </>
  );
};
export default StartHiring;
