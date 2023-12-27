import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import LeaveDay from './leaveDay';

const LeaveDuration = () => {
  return (
    <Box
      sx={{
              marginTop: '14px',
          marginBottom:"14px",
        border: '1px solid #E4E4E4',
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
              gap: '8px',
    
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Grid
          item
          xs={6}
          md={3}
          sx={{
            background: '#F6F6F6',
            border: '1px solid #E4E4E4',
            p: 2,
          }}
        >
          <Typography>{REQUESTVIEW_DATA.fromTo}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={9}
          sx={{
            background: '#F6F6F6',
            border: '1px solid #E4E4E4',
            p: 2,
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>
            {REQUESTVIEW_DATA.leaveweek}
          </Typography>
        </Grid>
      </Box>
      <LeaveDay />
    </Box>
  );
};
export default LeaveDuration;
