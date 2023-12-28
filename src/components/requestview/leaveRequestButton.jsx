import React from 'react';
import { Box, Button } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveRequestButtons = ({ modalType }) => {
  console.log('test', modalType);
  const isDeclineModal = modalType === 'Reject';
  const isApproveModal = modalType === 'Approve';
  const isCancelModal = modalType === 'Cancel';
  const isCancelRequestModal = modalType === 'Cancel Request';
  const isCloseModal = modalType === 'Close';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginRight: '10px',
      }}
    >
      {isDeclineModal && (
        <Button
          sx={{
            border: '1px solid #029894',
            background: '#FFF',
            width: '120px',
            borderRadius: '5px',
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
            borderRadius: '5px',
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
              borderRadius: '5px',
            }}
          >
            {REQUESTVIEW_DATA?.decline}
          </Button>
          <Button
            variant="contained"
            sx={{ width: '120px', borderRadius: '5px' }}
          >
            {REQUESTVIEW_DATA?.approve}
          </Button>
        </>
      )}
      {isCloseModal && (
        <Button
          variant="contained"
          sx={{ width: '120px', borderRadius: '5px' }}
        >
          {REQUESTVIEW_DATA?.close}
        </Button>
      )}
      {isCancelModal && (
        <Button
          sx={{
            border: '1px solid #029894',
            background: '#FFF',
            width: '120px',
            borderRadius: '5px',
          }}
        >
          {REQUESTVIEW_DATA?.cancel}
        </Button>
      )}
       {isCancelRequestModal && (
        <Button
          sx={{
            border: '1px solid #029894',
            background: '#FFF',
            width: '120px',
            borderRadius: '5px',
          }}
        >
          {REQUESTVIEW_DATA?.cancelReq}
        </Button>
      )}
    
    </Box>
  );
};
export default LeaveRequestButtons;
