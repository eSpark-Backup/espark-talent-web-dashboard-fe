import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

import { SIGNOUT_MODAL_DATA } from '@/src/constants/signoutModal';

const SignoutModal = () => {
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
              p: { xs: 6, sm: 6.7 },
              display: 'flex',
              gap: '28px',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {SIGNOUT_MODAL_DATA?.signout}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {SIGNOUT_MODAL_DATA?.signoutAccount}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Button
                sx={{
                  borderRadius: '5px',
                  border: '1px solid #595959',
                  color: ' #595959',
                  width: '120px',
                  fontSize: '16px',
                }}
                onClick={handleClose}
              >
                {SIGNOUT_MODAL_DATA?.cancel}
              </Button>
              <Button variant="primary" sx={{ width: '120px' }}>
                {SIGNOUT_MODAL_DATA?.signoutBtn}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SignoutModal;
