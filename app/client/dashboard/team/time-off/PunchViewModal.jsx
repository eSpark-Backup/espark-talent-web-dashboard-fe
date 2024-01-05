import React from 'react';
// import AppDropdown from '@/src/components/dashboard/appDropdown';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const LeaveViewModal = ({ modalData, handleClose }) => {
  // const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  // const [selectedJobTitle, setSelectedJobTitle] = useState(
  //   modalData?.leaveType
  // );
  return (
    <Box
      sx={{
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
            fontWeight: 600,
          }}
        >
          Punch request view
        </Typography>
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
              background: '#F6F6F6',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Date
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
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
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  November 1, 2023
                </Typography>
                <Image
                  src={'/icons/CalendarOutline.svg'}
                  width={20}
                  height={20}
                  alt="Date"
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
              background: '#FFF',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Punch time
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
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
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  08 :00 PM
                </Typography>
                <Image
                  src={'/icons/CalendarOutline.svg'}
                  width={20}
                  height={20}
                  alt="Date"
                />
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
              background: '#F6F6F6',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Punch type
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
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
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  Check out
                </Typography>
                <Image
                  src={'/icons/CalendarOutline.svg'}
                  width={20}
                  height={20}
                  alt="Date"
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
              background: '#fff',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '9px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                  minHeight: '100px',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  Write your description...
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {modalData?.status === 'Pending' ? (
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
              '&:hover': {},
            }}
          >
            Decline
          </Button>
          <Button onClick={handleClose} sx={{ ml: '20px' }} variant="contained">
            Approve
          </Button>
        </Box>
      ) : modalData?.status === 'Completed' ||
        modalData?.status === 'Rejected' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          <Button onClick={handleClose} variant="outlined">
            {modalData?.status}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default LeaveViewModal;
