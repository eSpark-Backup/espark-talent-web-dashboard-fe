import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import RequestHeading from './modalHeading';

const RequestviewModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
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
          <Box>ljaj</Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default RequestviewModal;
