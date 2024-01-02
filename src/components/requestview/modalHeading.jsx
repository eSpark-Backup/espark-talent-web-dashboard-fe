import React from 'react';
import { Box, Typography } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import { usePathname } from 'next/navigation';

const RequestHeading = ({title}) => {
  const pathName = usePathname();
  const isViewingClient = pathName == '/client/dashboard/team/time-off';
  return (
    <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
        }}
      >
        {
          title
        }
        {/* {isViewingClient
          ? REQUESTVIEW_DATA?.leaveRequestView
          : REQUESTVIEW_DATA?.createLeaveRequest} */}
      </Typography>
    </Box>
  );
};
export default RequestHeading;
