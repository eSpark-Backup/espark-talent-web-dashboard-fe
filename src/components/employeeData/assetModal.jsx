import React, { useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarIcon from '../StartHiring/CalenderIcon';

const AssetForm = ({ onClose, open }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Invalid file type. Please select an image.');
      event.target.value = null;
    }
  };

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
          height: { xs: '750px', md: '510px' },
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
            {EDIT_MODAL?.addassetForm}
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
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.gadgetName}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.gadgetPlaceholder}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assetID}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '11px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.assetidPlaceholder}
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
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assignedDate}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-picker-component"
                    sty
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    placeholder="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: 'small',
                        style: {
                          height: '30px',
                          width: '82%',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        height: '30px',
                        width: '82%',
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assigneeName}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.assignnamePlacholder}
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
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assignedEmail}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.assignedemailPlaceholder}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assigneePicture}
                </Typography>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.uploadPicture}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          width={30}
                          height={30}
                          alt="Refresh"
                          src={`/images/dashboard/upload.svg`}
                          onClick={handleClick}
                        />
                      </InputAdornment>
                    ),
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
              {EDIT_MODAL?.submit}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default AssetForm;
