import React from 'react';
import { Box, Modal } from '@mui/material';
import Image from 'next/image';

import RequestHeading from './modalHeading';
import LeaveRequest from './leaveRequestView';
// import LeaveRequest from './leaveRequestview';

const RequestviewModal = ({ open, onClose }) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            border: '1px solid #029894',
          }}
        >
          <Box
            sx={{
              background: '#fff',
              borderRadius: '20px',
              width: '40px',
              padding: '2.5px',
              position: 'absolute',
              top: '2%',
              right: '25%',
            }}
          >
            <Image
              src="/images/leave-request/cancel.svg"
              width={37}
              height={37}
              alt="cancel"
              onClick={onClose}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '53%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#fff',
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              height: '850px',
            }}
          >
            <RequestHeading />
            <LeaveRequest />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default RequestviewModal;
