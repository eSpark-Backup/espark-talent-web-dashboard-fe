import { useState, useRef } from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

import ProfileCroper from '@/src/components/ProfileCroper';
import { Toast } from '@/src/utils/toast';

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
        <Box sx={{ position: 'relative', textAlign: 'center', mb: 1 }}>
          <Typography variant="h5">Upload Image</Typography>
        </Box>

        <Box sx={{ mt: 1, textAlign: 'center' }}>
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
                  : typeof currentImage === 'string' &&
                      currentImage.startsWith('http')
                    ? currentImage
                    : ''
              }
              alt=""
              sx={{
                display:
                  photoURL ||
                  currentImage instanceof File ||
                  currentImage instanceof Blob ||
                  (typeof currentImage === 'string' &&
                    currentImage?.startsWith('http'))
                    ? 'flex'
                    : 'none',
                width: 100,
                height: 100,
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
              disabled={photoURL !== null ? true : false}
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
