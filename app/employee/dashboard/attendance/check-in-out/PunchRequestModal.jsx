import React, { useState } from 'react';
import ActionBarComponent from '@/src/components/requestview/actionbarComponent';
import { Box, Button, Grid, Typography } from '@mui/material';
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import Image from 'next/image';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const PunchRequestModal = ({ createModal, modalData, handleClose }) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState(
    modalData?.punchType || ''
  );
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
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);

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
        maxHeight: '82%',
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
          {createModal ? (
            <div>Create punch request</div>
          ) : (
            <div>Punch request view</div>
          )}
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            padding: '0 20px',
            mt: '20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#F6F6F6',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={5}>
              <Typography
                sx={{
                  color: '#171717',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                Date <span style={{ color: '#FF0000' }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ width: '100%' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="custom-date-time-picker"
                  open={isOpenDatePicker}
                  slots={{
                    openPickerIcon: () => (
                      <Image
                        src={'/icons/CalendarOutline.svg'}
                        width={20}
                        height={20}
                        alt="Date"
                        onClick={() => setIsOpenDatePicker((ps) => !ps)}
                      />
                    ),
                    actionBar: () => (
                      <ActionBarComponent onClose={handleCloseDatePicker} />
                    ),
                  }}
                  sx={{ width: '100%', borderRadius: '50%' }}
                  defaultValue={dayjs('2022-04-17')}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {createModal && (
        <Box>
          <Box
            sx={{
              padding: '20px',
            }}
          >
            <Grid
              container
              p={'5px 5px 5px 20px'}
              sx={{
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Grid item xs={12} md={5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                  }}
                >
                  Expected check in
                </Typography>
              </Grid>
              <Grid item xs={12} md={7} sx={{ width: '100%' }}>
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
                    10:00 AM
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {createModal && (
        <Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Grid
              container
              p={'5px 5px 5px 20px'}
              sx={{
                background: '#f6f6f6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Grid item xs={12} md={5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                  }}
                >
                  Expected check out
                </Typography>
              </Grid>
              <Grid item xs={12} md={7} sx={{ width: '100%' }}>
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
                    07:00 PM
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      <Box>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#FFF',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={5}>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                Punch type <span style={{ color: '#FF0000' }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  borderRadius: '5px',
                }}
              >
                <AppDropdown
                  data={[
                    {
                      label: 'Check in',
                    },
                    {
                      label: 'Check out',
                    },
                  ]}
                  setIsLoadingList={setIsLoadingTitles}
                  isLoadingList={isLoadingTitles}
                  selectedItem={selectedJobTitle}
                  setSelectedItem={setSelectedJobTitle}
                  placeHolder="Select Punch Type"
                  padding={'9px'}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            padding: '0 20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#F6F6F6',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={5}>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                Punch time <span style={{ color: '#FF0000' }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  borderRadius: '5px',
                  width: '100%',
                }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ width: '100%' }}
                >
                  <DesktopTimePicker
                    className="custom-date-time-picker"
                    open={false}
                    slots={{
                      openPickerIcon: () => null,
                    }}
                    sx={{ width: '100%' }}
                    defaultValue={dayjs('2022-04-17T15:30')}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#fff',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={5}>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ width: '100%' }}>
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
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                  // sx={{
                  // }}
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Write your description"
                />
              </Box>
            </Grid>
          </Grid>
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
            ml: '20px',
            width: '120px',
            border: '1px solid #029894',
            background: '#FFF',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            ml: '20px',
            width: '120px',
            '&:hover': {
              background: '#029894',
            },
          }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default PunchRequestModal;
