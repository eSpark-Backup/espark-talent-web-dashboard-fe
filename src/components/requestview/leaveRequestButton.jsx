import React from 'react';
import { Box, Button } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveRequestButtons = ({
  modalType,
  statusType,
  isViewingClient,
  onClose,
}) => {
  const isDeclineModal = modalType === 'Reject';
  const isApproveModal = modalType === 'Approve';
  const isPendingModal = statusType === 'Pending';
  const isCompletedModal = statusType === 'Completed';

  const isCancelRequestModal = statusType === 'Cancel';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        gap: { xs: '5px', md: '10px' },
        marginRight: { xs: '0px', md: '10px' },
      }}
    >
      {!isViewingClient && (
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            marginTop: '80px',
          }}
        >
          <Button
            sx={{
              border: '1px solid #029894',
              background: '#FFF',
              width: { xs: '80px', md: '120px' },
              borderRadius: '5px',
            }}
            onClick={onClose}
          >
            {REQUESTVIEW_DATA?.cancelBtn}
          </Button>
          <Button
            variant="contained"
            sx={{ width: { xs: '80px', md: '120px' }, borderRadius: '5px' }}
          >
            {REQUESTVIEW_DATA?.save}
          </Button>
        </Box>
      )}

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

      {isViewingClient && !isApproveModal && !isDeclineModal && (
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

      {isPendingModal && (
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

      {isCompletedModal && (
        <Button
          variant="contained"
          sx={{ width: '120px', borderRadius: '5px' }}
        >
          {REQUESTVIEW_DATA?.close}
        </Button>
      )}
    </Box>
  );
};
export default LeaveRequestButtons;
