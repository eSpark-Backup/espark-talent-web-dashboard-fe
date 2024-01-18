import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const AttendanceViewModal = ({ modalData, handleClose }) => {
  const fontSize = {
    '@media (min-width: 280px) and (max-width: 400px)': {
      fontSize: '12px',
    },
  };
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
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
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
      <Box p={'40px'}>
        <Grid
          container
          display={'flex'}
          flexDirection={'row'}
          sx={{
            '@media (min-width: 900px) and (max-width: 1370px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Grid item xs={12} md={2.25}>
            <Box
              sx={{
                width: '176px',
                height: '176px',
                borderRadius: '50%',
                background: '#f6f6f6',
                marginBottom: { xs: '15px', md: '0px' },
                '@media (min-width: 900px) and (max-width: 1370px)': {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={9.75}>
            <Grid container columnSpacing={'40px'}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    background: '#F6F6F6',
                    padding: '10px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
                        }}
                      >
                        es-00020
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    padding: '12px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
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
                    padding: '10px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
                        }}
                      >
                        Jauhar, Block 1
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    padding: '11px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
                        }}
                      >
                        Web developer
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    background: '#F6F6F6',
                    padding: '10px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
                        }}
                      >
                        Bilal Khan
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    padding: '12px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
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
                    padding: '10px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
                        }}
                      >
                        Software
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    padding: '12px',
                    borderRadius: '5px',
                    maxWidth: '550px',
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
                          ...fontSize,
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
                          ...fontSize,
                        }}
                      >
                        Oct26,2021
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: '20px',
        }}
      >
        <Box>
          <Box
            sx={{
              padding: '0 20px 10px',
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
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    color: '#171717',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
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
                      fontWeight: 500,
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
              padding: '0 20px 10px',
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
                gap: { xs: '10px', md: '0px' },
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
        <Box>
          <Box
            sx={{
              padding: '0 20px 10px',
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
                gap: { xs: '10px', md: '0px' },
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
                    {modalData?.checkIn}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '0 20px 10px',
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
                gap: { xs: '10px', md: '0px' },
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
                gap: { xs: '10px', md: '0px' },
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
                    {modalData?.checkOut}
                  </Typography>
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
            ml: '20px',
            width: '120px',
            background: '#029894',
            color: '#fff',
            ':&hover:': {
              background: '#029894',
            },
          }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceViewModal;
