import React from 'react';
import { Box, Button } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveRequestButtons = ({ modalType }) => {
  console.log('test', modalType);
  const isDeclineModal = modalType === 'Reject';
  const isApproveModal = modalType === 'Approve';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
      }}
    >
      {isDeclineModal && (
        <Button
          sx={{
            border: '1px solid #029894',
            background: '#FFF',
            width: '120px',
          }}
        >
          {REQUESTVIEW_DATA?.decline}
        </Button>
      )}
      {isApproveModal && (
        <Button
          sx={{
            border: '1px solid #029894',
            background: '#FFF',
            width: '120px',
          }}
        >
          {REQUESTVIEW_DATA?.approved}
        </Button>
      )}
      {!isApproveModal && !isDeclineModal && (
        <>
          <Button
            sx={{
              border: '1px solid #029894',
              background: '#FFF',
              width: '120px',
            }}
          >
            {REQUESTVIEW_DATA?.decline}
          </Button>
          <Button variant="contained" sx={{ width: '120px' }}>
            {REQUESTVIEW_DATA.approve}
          </Button>
        </>
      )}
    </Box>
  );
};
export default LeaveRequestButtons;
