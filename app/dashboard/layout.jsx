import React from 'react';
import { Grid } from '@mui/material';

import TopNav from '@/src/components/dashboard/TopNav/TopNav';

const InnerPagesLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Grid container>
        <Grid item xs={12} md={2} />
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: 'flex',
          }}
        >
          {children}
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>
    </>
  );
};
export default InnerPagesLayout;
