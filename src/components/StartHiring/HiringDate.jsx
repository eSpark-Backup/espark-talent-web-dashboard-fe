import React from 'react';
import { Box, Grid } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import DatePickerBox from './DatePicker';
// Test

const HiringDate = () => {
  return (
    <Box>
      <Grid
        container
        gap={'10px'}
        sx={{
          flexWrap: { xs: 'wrap', lg: 'nowrap' },
        }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            mb: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <DatePickerBox
              label={HIRING_FORM_DATA?.selectStartDate}
              dateKey="startDate"
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              mb: '10px',
            }}
          >
            <DatePickerBox
              label={HIRING_FORM_DATA?.selectEndDate}
              dateKey="endDate"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HiringDate;
