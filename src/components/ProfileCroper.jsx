'use client';
import { useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Slider,
} from '@mui/material';
import Cropper from 'react-easy-crop';
import CropIcon from '@mui/icons-material/Crop';
import { Cancel } from '@mui/icons-material';
import getCroppedImg from '@/src/utils/cropImage';

const ProfileCroper = ({
  photoURL,
  setPhotoURL,
  selectedFile,
  handleSubmit,
  handleClose,
  isLoading,
  isPending,
  setSelectedFile,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation,
        { horizontal: false, vertical: false },
        selectedFile?.name,
        selectedFile.type
      );
      setPhotoURL(url);
      handleSubmit(file, url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          mx: 'auto',
          width: '100%',
          maxWidth: { xs: 350 },
          height: { xs: '280px', sm: 280 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: 'column',
          '@media(min-width: 280px) and (max-width: 320px)': {
            mx: 'auto',
          },
          mx: {
            xs: 1,
            sm: 3,
          },
          my: 2,
        }}
      >
        <Box sx={{ width: '100%', mb: 1 }}>
          <Box>
            <Slider
              disabled={isPending}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Button
            sx={{ width: { xs: '100%', sm: '45%' } }}
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => {
              handleClose(false);
              setSelectedFile(null);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            sx={{ width: { xs: '100%', sm: '45%' } }}
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            {isLoading ? <CircularProgress size={20} /> : 'Update'}
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default ProfileCroper;
