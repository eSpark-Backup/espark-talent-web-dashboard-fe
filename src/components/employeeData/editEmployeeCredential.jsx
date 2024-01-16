import React from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';

const EditEmployeeCredential = ({ onClose, open }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', md: '40%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: { xs: '600px', md: '414px' },
          position: 'absolute',
          top: '10%',
          '@media (min-width: 900px) and (max-width: 1440px)': {
            width: '70%',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
              marginLeft: '20px',
            }}
          >
            {EDIT_MODAL?.editEmployeeCredentials}
          </Typography>
          <Box
            sx={{
              width: { xs: '35px', md: '25px' },
              height: { xs: '35px', md: '25px' },
            }}
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', md: '40px' },
              width: '80%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '20px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.employeeId}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.id}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.currentPassword}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '11px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.enterPassword}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '20px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.newPassword}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.enternewPassword}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.confirmPassword}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.confirmPassword}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="primary"
              sx={{
                width: { xs: '100px', sm: '120px' },
                height: '40px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {EDIT_MODAL?.save}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default EditEmployeeCredential;
