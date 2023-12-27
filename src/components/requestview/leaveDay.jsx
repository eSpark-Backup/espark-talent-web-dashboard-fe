import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import { LEAVE_DATA } from '@/src/constants/requestviewModal';

const LeaveDay = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '70px',
      }}
    >
      <Grid
        item
        xs={6}
        md={3}
        sx={{
          border: '1px solid #E4E4E4',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src="/images/leave-request/ellipse.svg"
          width={50}
          height={50}
          alt="ellipse"
        />
        <Box
          sx={{
            gap: '10px',
          }}
        >
          <Typography>{LEAVE_DATA?.employeeName}</Typography>
          <Typography>{LEAVE_DATA?.id}</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        md={9}
        sx={{
          border: '1px solid #E4E4E4',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '110px',
            height: '50px',
            border: '1px solid #E4E4E4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10px',
          }}
        >
          <Box>
            <Typography>{LEAVE_DATA?.day}</Typography>
          </Box>
          <Box
            sx={{
              width: '110px',
              background: '#F6F6F6',
              border: '1px solid #F6F6F6',
              p: 0.5,
            }}
          >
            <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>
              {LEAVE_DATA?.timeFromto}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
export default LeaveDay;
