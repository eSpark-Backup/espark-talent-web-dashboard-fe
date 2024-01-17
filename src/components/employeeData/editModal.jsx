import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';

const EditModal = ({ handleOpenModal, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Invalid file type. Please select an image.');
      event.target.value = null;
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <Box>
      <Modal
        open={handleOpenModal}
        onClose={onClose}
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
            width: '450px',
            '@media (max-width: 499px)': {
              width: '90%',
            },
            height: { xs: '250px', sm: '250px' },
            boxShadow: 24,
            borderRadius: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Image
              src={'/images/leave-request/close.svg'}
              width={25}
              height={25}
              alt="close"
              onClick={onClose}
              style={{
                marginTop: '10px',
                marginRight: '10px',
              }}
            />
          </Box>

          <Box
            sx={{
              padding: { xs: '10px', md: '0px' },
              display: 'flex',
              gap: { xs: '10px', md: '15px' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {EDIT_MODAL?.editProfile}
            </Typography>
            <Image
              src={'/images/dashboard/employee.svg'}
              width={100}
              height={100}
              alt="employee"
            />
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
                  width: { xs: '90px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                onClick={onClose}
              >
                {EDIT_MODAL?.remove}
              </Button>
              <Button
                variant="primary"
                sx={{
                  width: { xs: '100px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              >
                {EDIT_MODAL?.change}
              </Button>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditModal;
