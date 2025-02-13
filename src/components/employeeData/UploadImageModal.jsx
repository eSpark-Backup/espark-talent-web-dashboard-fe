import React, { useState, useRef } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Toast } from '../Toast/Toast';
import ProfileCroper from '../ProfileCroper';

const UploadImageModal = ({
  open,
  onClose,
  setFieldValue,
  errors,
  setErrors,
  currentImage,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];

    if (file) {
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      const fileName = file?.name?.toLowerCase();
      const isJfif = fileName?.endsWith('.jfif'); 

      if (allowedTypes?.includes(file?.type) && !isJfif) {
        setSelectedFile(file);
      } else {
        Toast('error', 'Only .jpg and .png files are allowed');
      }
    }
  };

  const handleUploadImage = () => {
    fileInputRef?.current?.click();
  };

  const handleClose = () => {
    onClose();
    setSelectedFile(null);
  };

  const handleSubmit = (file) => {
    if (file) {
      const convertedFile = new File([file], file?.name || 'default-name.png', {
        type: file?.type,
        lastModified: Date?.now(),
      });
      setFieldValue('image', convertedFile);
      setErrors({ ...errors, image: '' });
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <Modal
      open={open}
      disableScrollLock
      onClose={handleClose}
      aria-labelledby="edit-profile-modal"
      aria-describedby="edit-profile-modal-description"
      disableEnforceFocus
      disableRestoreFocus
    >
      <Box
        className="scrollbar-container"
        sx={{
          background: '#fff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: 'auto',
          maxHeight: '90%',
          maxWidth: { xs: 350, md: 450 },
          p: 4,
          borderRadius: '10px',
          boxShadow: 24,
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="h5">Upload Image</Typography>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={
                photoURL ||
                currentImage instanceof File ||
                currentImage instanceof Blob
                  ? URL.createObjectURL(currentImage)
                  : ''
              }
              alt=""
              sx={{
                display:
                  photoURL ||
                  currentImage instanceof File ||
                  currentImage instanceof Blob
                    ? 'flex'
                    : 'none',
                width: 100,
                height: 100,
                borderRadius: '50%',
                objectFit: 'cover',
                mx: 'auto',
              }}
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none', cursor: 'pointer' }}
              onChange={handleFileChange}
            />
            <Button
              disabled={photoURL !== null ? true : false}
              onClick={handleUploadImage}
              variant="contained"
              color="primary"
              sx={{ mx: 'auto', width: '95%', mt: 2 }}
            >
              {'Upload Image'}
            </Button>
          </Box>
          {selectedFile && (
            <Box sx={{ mt: 2 }}>
              <ProfileCroper
                photoURL={URL?.createObjectURL(selectedFile) || ''}
                selectedFile={selectedFile}
                setPhotoURL={setPhotoURL}
                handleSubmit={handleSubmit}
                isLoading={false}
                isPending={photoURL !== null ? true : false}
                handleClose={handleClose}
                setSelectedFile={setSelectedFile}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadImageModal;
