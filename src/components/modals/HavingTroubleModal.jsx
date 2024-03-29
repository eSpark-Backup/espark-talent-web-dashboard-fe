import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const HavingTroubleModal = ({ open, data, onClose }) => {
  const { heading, description, buttonText } = data || {};
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2.8,
            position: 'absolute',
            top: 'auto',
            mx: { xs: 2.5, sm: 'auto' },
            maxWidth: 450,
            minHeight: 250,
            bgcolor: '#FFFFFF',
            borderRadius: '5px',
            p: 4,
          }}
        >
          <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
            {heading || ''}
          </Typography>
          <Typography
            sx={{ fontSize: '14px', fontWeight: 400, color: '#595959' }}
            dangerouslySetInnerHTML={{
              __html: description || '',
            }}
          />
          <Button
            disableRipple
            onClick={onClose}
            sx={{
              width: { xs: '100px', md: '120px' },
              mr: '15px',
              '&:hover': {
                background: '#029894',
                color: '#fff',
              },
            }}
            variant="outlined"
          >
            {buttonText || ''}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default HavingTroubleModal;
