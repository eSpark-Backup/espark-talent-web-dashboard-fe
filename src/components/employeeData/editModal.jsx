import React, { useState, useRef } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '@/src/services/apiService';
import {
  HR_GET_CLIENT_PROFILE,
  HR_UPDATE_EMP_IMAGE,
} from '@/src/services/apiService/apiEndPoints';
import { Toast } from '../Toast/Toast';
import { updateCurrentEmployeeImage } from '@/src/redux/slices/hrSlices/employeeSlice';
import ProfileCroper from '../ProfileCroper';
import { updateCurrentClientImage } from '@/src/redux/slices/hrSlices/clientSlice';

const EditProfileModal = ({ open, onClose, isClient }) => {
  const dispatch = useDispatch();
  const { currentEmployee } =
    useSelector((state) => state?.hr?.employees) || {};
  const { currentClient } = useSelector((state) => state?.hr?.clients) || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate, isLoading, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals?.data) {
        formData?.append(key, formVals?.data[key]);
      }
      return api.updateData(
        `${isClient ? HR_GET_CLIENT_PROFILE : HR_UPDATE_EMP_IMAGE}?id=${formVals?.id}`,
        formData
      );
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Profile picture updated successfully');
      if (isClient) {
        dispatch(updateCurrentClientImage(data?.image));
      } else {
        dispatch(updateCurrentEmployeeImage(data?.image));
      }
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      onClose();
    },
  });

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];
    if (file && (file?.type === 'image/jpeg' || file?.type === 'image/png')) {
      setSelectedFile(file);
    } else {
      Toast('error', 'Only .jpg and .png files are allowed');
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
    mutate({
      id: isClient ? currentClient?.id : currentEmployee?.id,
      data: {
        image: convertedFile,
      },
    });
  };

  const handleClose = () => {
    onClose();
    setSelectedFile(null);
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
            <Box
              component="img"
              src={
                photoURL ||
                (isClient
                  ? currentClient?.image_path || currentClient?.image
                  : currentEmployee?.image_path)
              }
              alt=""
              sx={{
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
              disabled={isPending || isLoading}
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
                isLoading={isLoading}
                isPending={isPending}
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

export default EditProfileModal;
