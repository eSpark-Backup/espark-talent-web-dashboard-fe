import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import { RESOURCE_DATA } from '@/src/constants/resources';
import HolidaysCalender from './HolidaysCalender';

const EmployeeData = () => {
  return (
    <Grid container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: '12px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: { xs: '350px', md: '300px' },
              borderRadius: '10px',
              background: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              padding: '18px',
              border: '1px solid #E4E4E4',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '440px',
                gap: '30px',
                paddingTop: '30px',
              }}
            >
              <Box>
                <Image
                  src="/images/resources/earth-search.svg"
                  width={70}
                  height={70}
                  alt="search"
                />
              </Box>
              <Typography variant="h3">{RESOURCE_DATA?.esparkWiki}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                {RESOURCE_DATA?.employeeData}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <HolidaysCalender />
        </Grid>
      </Box>
    </Grid>
  );
};
export default EmployeeData;
