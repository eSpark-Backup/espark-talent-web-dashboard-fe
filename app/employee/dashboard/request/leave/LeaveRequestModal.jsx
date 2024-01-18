import React, { useState } from 'react';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import LeaveDatePicker from '@/src/components/requestview/leaveDatepicker';
import LeaveRequestForm from './LeaveRequestForm';

const LeaveRequestModal = ({ handleClose }) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${
          theme.palette.mode === 'dark' ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === 'dark' ? grey[900] : grey[50]
        };
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === 'dark' ? blue[600] : blue[200]
          };
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );

  const handleUpload = (e) => {
    const fileName = e?.target?.files[0]?.name;
    setUploadedFileName(fileName);
  };

  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        width: { xs: '90%', sm: '90%', md: '77.084%' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '80%',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          Create leave request
        </Typography>
      </Box>
      <LeaveRequestForm handleClose={handleClose} />
    </Box>
  );
};

export default LeaveRequestModal;
