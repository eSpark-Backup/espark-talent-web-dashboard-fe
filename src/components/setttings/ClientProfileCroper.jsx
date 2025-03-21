import React, { useState, useRef } from 'react';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '@/src/services/apiService';
import { CLIENT_UPDATE_PIC } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '../Toast/Toast';
import ProfileCroper from '../ProfileCroper';
import { updateClientImage } from '@/src/redux/slices/clientSlices/homeSlice';

const ClientProfileCroper = ({ open, onClose, currentImage }) => {
  const { isLoading } = useSelector((state) => state?.client?.home?.data);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      return await api.postData(`${CLIENT_UPDATE_PIC}`, formData);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Profile picture updated successfully');
      dispatch(updateClientImage(data?.image));
      onClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.error[0] || 'Failed to delete data');
      onClose();
    },
  });

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

  const handleSubmit = (file) => {
    const convertedFile = new File([file], file?.name || 'default-name.png', {
      type: file?.type,
      lastModified: Date?.now(),
    });
    const formData = new FormData();
    formData?.append('picture', convertedFile);
    mutate(formData);
  };

  const handleClose = () => {
    onClose();
    setSelectedFile(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-modal"
      aria-describedby="edit-profile-modal-description"
      disableScrollLock
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

        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={photoURL || currentImage}
              sx={{
                width: { xs: '100px', md: '100px' },
                height: { xs: '100px', md: '100px' },
                borderRadius: '50%',
                objectFit: 'cover',
                mx: 'auto',
                mb: 2,
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
              disabled={isPending}
              onClick={handleUploadImage}
              variant="contained"
              color="primary"
              sx={{ mx: 'auto', width: '95%' }}
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
                isPending={isPending}
                isLoading={isLoading}
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

export default ClientProfileCroper;
