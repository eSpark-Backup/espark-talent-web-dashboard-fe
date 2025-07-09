import React from 'react';
import { Box, Grid } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/hiring';
import DatePickerBox from './DatePicker';

const HiringDate = () => {
  return (
    <Box>
      <Grid
        container
        gap={'20px'}
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
              placeholder={'Select Start Date'}
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
              placeholder={'Select End Date'}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HiringDate;
