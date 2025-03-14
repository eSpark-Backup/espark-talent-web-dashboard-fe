'use client';
import React, { useState, useRef } from 'react';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { Toast } from '../Toast/Toast';
import ProfileCroper from '../ProfileCroper';

const EditSettingProfile = ({
  open,
  onClose,
  isImage,
  setFieldValue,
  setImageFile,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];

    if (file) {
      const validMimeTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
      ];
      const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase();

      if (validMimeTypes?.includes(file?.type) && fileExtension !== 'jfif') {
        setSelectedFile(file);
      } else {
        onClose();
        Toast('error', 'Only .jpg, .jpeg, .png, and .svg files are allowed');
        event.target.value = null;
      }
    }
  };

  const handleUploadImage = () => {
    fileInputRef?.current?.click();
  };

  const handleSubmit = (file, url) => {
    setImageFile(url);
    setFieldValue('image', file);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
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
          overflow: 'auto',
          maxWidth: { xs: 350, md: 450 },
          p: 4,
          borderRadius: '10px',
          boxShadow: 24,
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="h5">Edit Profile Picture</Typography>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={isImage}
              sx={{
                width: { xs: '100px', md: '100px' },
                height: { xs: '100px', md: '100px' },
                borderRadius: '100%',
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
                setPhotoURL={setImageFile}
                handleSubmit={handleSubmit}
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

export default EditSettingProfile;
