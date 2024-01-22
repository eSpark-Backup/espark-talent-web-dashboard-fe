import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

const AppConfirmationMadal = ({
  title,
  bodyText,
  confirmButtonText,
  cancelButtonText,
  handleClose,
  isOpen,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <>
        <Box
          sx={{
            bgcolor: '#fff',
            width: { xs: '90%', sm: '90%', md: '40%', lg: '30%' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            maxHeight: '90%',
            overflowY: 'auto',
            padding: '38px 0',
          }}
        >
          <Box display={'flex'} justifyContent="center">
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '24px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent="center" my={'50px'}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '17px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              {bodyText}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent="center">
            <Button
              onClick={handleClose}
              sx={{ minWidth: '120px', mr: '15px' }}
              variant="outlined"
            >
              {cancelButtonText}
            </Button>
            <Button
              onClick={handleClose}
              sx={{ minWidth: '120px' }}
              variant="contained"
            >
              {confirmButtonText}
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default AppConfirmationMadal;
