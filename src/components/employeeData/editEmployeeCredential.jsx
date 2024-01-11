import React from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';
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
          width: { xs: '90%', sm: '90%', md: '40%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: { xs: '600px', md: '414px' },
          position: 'absolute',
          top: '10%',
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
              display: 'flex',
            }}
          >
            <Image
              src={'/images/leave-request/close.svg'}
              width={25}
              height={25}
              alt="close"
              onClick={onClose}
            />
          </Box>
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
              gap: '40px',
              width: '80%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.employeeId}
                </Typography>
                <TextField sx={{ width: '82%' }} placeholder={EDIT_MODAL?.id} />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.currentPassword}
                </Typography>
                <TextField
                  sx={{ width: '82%' }}
                  placeholder={EDIT_MODAL?.enterPassword}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.newPassword}
                </Typography>
                <TextField
                  sx={{ width: '82%' }}
                  placeholder={EDIT_MODAL?.enternewPassword}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.confirmPassword}
                </Typography>
                <TextField
                  sx={{ width: '82%' }}
                  placeholder={EDIT_MODAL?.confirmPassword}
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
                //   marginTop:"50px"
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
