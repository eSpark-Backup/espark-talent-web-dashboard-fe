import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const AttendanceViewModal = ({ modalData, handleClose }) => {
  console.log({ modalData });
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
          Attendance view
        </Typography>
      </Box>
      <Box p={'20px'}>
        <Grid container spacing={'40px'} display={'flex'} flexDirection={'row'}>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#f6f6f6',
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                background: '#F6F6F6',
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Employee ID:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    es-00020
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Company:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    eSpark talent
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                background: '#F6F6F6',
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Branch:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Jauhar, Block 1
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Job title:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Web developer
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                background: '#F6F6F6',
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Name:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Bilal Khan
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Location:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Karachi, Pakistan
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                background: '#F6F6F6',
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Department:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Software
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Joining date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Oct26,2021
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
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
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '#171717',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
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
                  p: '15px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography>November 1, 2023</Typography>
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
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '15px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography>10:00 AM</Typography>
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
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                Check in time
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '15px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography>{modalData?.checkIn}</Typography>
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
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '15px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography>07:00 PM</Typography>
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
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                Check out time
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '15px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography>{modalData?.checkOut}</Typography>
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
        <Button onClick={handleClose} sx={{ ml: '20px' }} variant="contained">
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceViewModal;
