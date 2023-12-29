import React from 'react';
import { Box, Typography } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const RequestHeading = ({ view }) => {
  return (
    <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
        }}
      >
        {view
          ? REQUESTVIEW_DATA?.leaveRequestView
          : REQUESTVIEW_DATA?.createLeaveRequest}
      </Typography>
    </Box>
  );
};
export default RequestHeading;
