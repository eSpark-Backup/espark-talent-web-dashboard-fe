import React, { useState } from 'react';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import LeaveDatePicker from '@/src/components/requestview/leaveDatepicker';

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
      <Box sx={{ padding: '20px', mb: '10px' }}>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Leave type <span style={{ color: '#FF0000' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <AppDropdown
                  data={[
                    {
                      label: 'Sick leave',
                    },
                    {
                      label: 'Casual leave',
                    },
                    {
                      label: 'Annual leave',
                    },
                  ]}
                  setIsLoadingList={setIsLoadingTitles}
                  isLoadingList={isLoadingTitles}
                  selectedItem={selectedJobTitle}
                  setSelectedItem={setSelectedJobTitle}
                  placeHolder="Select"
                  mb={'2px'}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#fff',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Start date
                  <span style={{ color: '#FF0000' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <LeaveDatePicker />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  End date
                  <span style={{ color: '#FF0000' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <LeaveDatePicker />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#FFF',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Count
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    1
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#f6f6f6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Available leaves
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    0
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#FFF',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Attachment
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <label htmlFor="input-attachment">
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '9px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Box display={'flex'} flexDirection={'row'}>
                      <Typography
                        sx={{
                          color: '#595959',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: 'normal',
                        }}
                      >
                        {uploadedFileName}
                      </Typography>
                      <input
                        onChange={handleUpload}
                        id="input-attachment"
                        type="file"
                        style={{ width: 0, height: 0, visibility: 'hidden' }}
                      />
                    </Box>

                    <Image
                      src={'/icons/Attachment.svg'}
                      width={20}
                      height={20}
                      alt="Attachment"
                    />
                  </Box>
                </label>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grid
              container
              p={'12px'}
              sx={{
                background: '#f6f6f6',
                borderRadius: '5px',
                display: 'flex',
                // alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.4}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Reason
                  <span style={{ color: '#FF0000' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.6} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  sx={{
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                >
                  <Textarea
                    sx={{
                      width: '100%',
                      background: '#f6f6f6',
                      '::placeholder': {
                        color: '#595959',
                      },
                      '&:hover': {
                        border: '1px solid #E4E4E4',
                      },
                      '&:focus': {
                        border: '1px solid #E4E4E4',
                      },
                    }}
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Please mention reason of leave..."
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        sx={{ padding: '20px' }}
      >
        <Button
          onClick={handleClose}
          sx={{
            width: '120px',
            border: '1px solid #029894',
            background: '#FFF',
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            ml: '20px',
            width: '120px',
            background: '#029894',
            color: '#fff',
          }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default LeaveRequestModal;
