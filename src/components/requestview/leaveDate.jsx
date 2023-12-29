import React from 'react';
import { Box, Typography } from '@mui/material';

import LeaveDatePicker from './leaveDatepicker';

const LeaveDate = ({ date, backgroundColor, view }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: backgroundColor || '#fff',
        p: 1,
      }}
    >
      <Typography>
        {view ? (
          date
        ) : (
          <>
            {date}
            <span
              style={{
                color: 'red',
                fontSize: '25px',
                marginLeft: '65px',
                marginTop: '-25px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              *
            </span>
          </>
        )}
      </Typography>

      <Box sx={{ background: '#F6F6F6' }}>
        <LeaveDatePicker view={view} />
      </Box>
    </Box>
  );
};
export default LeaveDate;
