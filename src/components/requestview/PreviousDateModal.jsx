import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import WarningAmberSharpIcon from '@mui/icons-material/WarningAmberSharp';

import { BACKDATE_MODAL } from '@/src/constants/requestviewModal';

const PreviousDateModal = () => {
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
            background: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '70%', md: '450px' },
            height: { xs: '280px', sm: '250px' },
            boxShadow: 24,
            borderRadius: '5px',
          }}
        >
          <Box
            sx={{
              p: { xs: 6, sm: 5 },
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <WarningAmberSharpIcon
              sx={{
                fontSize: '60px',
                alignSelf: 'center',
                color: 'teal',
              }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {BACKDATE_MODAL?.warning}
            </Typography>

            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {BACKDATE_MODAL?.backdate}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Button
                variant="primary"
                sx={{
                  borderRadius: '5px',

                  width: '120px',
                }}
                onClick={handleClose}
              >
                {BACKDATE_MODAL?.okBtn}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PreviousDateModal;
