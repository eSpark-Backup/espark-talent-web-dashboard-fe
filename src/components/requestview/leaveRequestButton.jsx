import React from 'react';
import { Box, Button } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveRequestButtons = ({
  modalType,
  statusType,
  isViewingClient,
  isViewingEmployee,
  onClose,
  createLeaveRequest,
  viewPunchRequest,
  createPunchRequest
}) => {
  const isDeclineModal = statusType === 'Rejected';
  const isApproveModal = statusType === 'Approve';
  const isPendingModal = statusType === 'Pending';
  const isCompletedModal = statusType === 'Completed';

  const isCancelRequestModal = statusType === 'Cancelled';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        gap: { xs: '5px', md: '10px' },
        marginRight: { xs: '0px', md: '10px' },
      }}
    >
      {Boolean(isViewingClient) && (
        <>
          {isPendingModal ? (
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
          ) : isDeclineModal ? (
            <Button
              sx={{
                border: '1px solid #029894',
                width: '120px',
                borderRadius: '5px',
              }}
            >
              Declined
            </Button>
          ) : isCompletedModal ? (
            <Box
              sx={{
              }}
            >
              <Button
              sx={{
                border: '1px solid #029894',
                width: '120px',
                borderRadius: '5px',
              }}
            >
                Approved
              </Button>
            </Box>
          ) : null}
        </>
      )}
      {Boolean(isViewingEmployee) && (
        <>
          {isPendingModal ? (
            <Box
              sx={{
              }}
            >
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
            </Box>
          ) : isCancelRequestModal ? (
            <Button
              sx={{
                border: '1px solid #029894',
                width: '120px',
                borderRadius: '5px',
              }}
              variant="contained"
            >
              Close
            </Button>
          ) : isCompletedModal ? (
            <Box
              sx={{
              }}
            >
              <Button
                variant="contained"
                sx={{ width: '120px', borderRadius: '5px' }}
              >
                {REQUESTVIEW_DATA?.close}
              </Button>
            </Box>
          ) : null}
        </>
      )}
      {Boolean(createPunchRequest) && (
        <>
        <Button
          sx={{
            border: '1px solid #029894',
            background: '#FFF',
            width: '120px',
            borderRadius: '5px',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: '120px', borderRadius: '5px' }}
        >
          Save
        </Button>
      </>
      )}
      {Boolean(viewPunchRequest) && (
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Button
            variant='contained'
          >
            Close
          </Button>
        </Box>
      )}
      {Boolean(createLeaveRequest) && (
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
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
    </Box>
  );
};
export default LeaveRequestButtons;
