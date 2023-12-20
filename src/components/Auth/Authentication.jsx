'use client';
import * as React from 'react';
import Grid from '@mui/material/Grid';

import AuthForm from './AuthForm';
import {
  Auth_Background_Image,
  Auth_Fields,
  Auth_Signin,
} from '@/src/constants/authConstant';

export default function Authentication() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={6}
        lg={4.5}
        sx={{
          backgroundImage: `url(${Auth_Background_Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={12} md={6} lg={7.5}>
        <AuthForm uiData={Auth_Signin} fields={Auth_Fields} />
      </Grid>
    </Grid>
  );
}
