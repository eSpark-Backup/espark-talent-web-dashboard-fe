import React from 'react';
import { Box } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import DatePickerBox from './DatePicker';

const HiringDate = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          paddingTop: '25px',
          gap: { xs: '9px', md: '0px' },
          '@media (min-width: 900px) and (max-width: 1400px)': {
            flexDirection: 'column',
            gap: '10px',
          },
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <DatePickerBox
            label={HIRING_FORM_DATA?.selectEndDate}
            dateKey="endDate"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default HiringDate;
