import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import Image from 'next/image';

import RequestHeading from './modalHeading';
import LeaveRequest from './leaveRequestview';

const RequestviewModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
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
              top: '7%',
              right: '25%',
            }}
          >
            <Image
              src="/images/leave-request/cancel.svg"
              width={37}
              height={37}
              alt="cancel"
              onClick={handleClose}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#fff',
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
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
