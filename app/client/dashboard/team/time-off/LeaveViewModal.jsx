import React, { useState } from 'react';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const LeaveViewModal = ({ modalData, handleClose }) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState(
    modalData?.leaveType
  );
  return (
    <>
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', sm: '90%', md: '77.084%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
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
            Leave request view
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
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
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Leave type
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <AppDropdown
                  disabled
                  data={[
                    {
                      label: 'Salary based',
                    },
                    {
                      label: 'Hourly based',
                    },
                    {
                      label: 'Project based',
                    },
                  ]}
                  setIsLoadingList={setIsLoadingTitles}
                  isLoadingList={isLoadingTitles}
                  selectedItem={selectedJobTitle}
                  setSelectedItem={setSelectedJobTitle}
                  placeHolder="Select Leave Type"
                  padding="9px"
                />
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
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Start date
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
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
                  <Typography sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}>
                    October 17,2023
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
              padding: '10px 20px',
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
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  End date
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
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
                  <Typography sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}>October 17,2023</Typography>
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
        <Box
          sx={{
            padding: '0 20px',
          }}
        >
          <Grid
            spacing={'5px'}
            sx={{
              border: 'solid 1px #ccc',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'row',
            }}
            container
            p={'5px 5px 5px 10px'}
          >
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  width: '100%',
                  py: '11px',
                  display: 'flex',
                  justifyContent: 'center',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: { xs: '12px', lg: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Oct 17,23 - Oct 17,23
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  border: 'solid 1px #ccc',
                  borderRadius: '5px',
                  mt: '5px',
                  p: '0 5px',
                }}
              >
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#f6f6f6',
                    my: '9px',
                  }}
                />
                <Box ml={'5px'}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: { xs: '12px', lg: '16px' },
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Bilal Ahmed Khan
                  </Typography>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: { xs: '10px', lg: '14px' },
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    eS-00020
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid display={'flex'} flexDirection={'column'} item xs={12} md={9}>
              <Box
                sx={{
                  width: '100%',
                  py: '11px',
                  display: 'flex',
                  justifyContent: 'center',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: { xs: '12px', lg: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  October week3
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  border: 'solid 1px #ccc',
                  borderRadius: '5px',
                  mt: '5px',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    border: 'solid 1px #ccc',
                    m: '5px',
                    flex: 1,
                    borderRadius: '5px',
                  }}
                  display={'flex'}
                  justifyContent={'flex-end'}
                  flexDirection={'column'}
                >
                  <Box sx={{ mb: '5px' }}>
                    <Typography
                      textAlign={'center'}
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '12px', lg: '14px' },
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                      }}
                    >
                      Tuesday
                    </Typography>
                  </Box>
                  <Box sx={{ background: '#F6F6F6' }} p={'0 10px'}>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '8px', lg: '10px' },
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        textAlign: { xs: 'center', md: 'left' },
                        p: '8px 0',
                      }}
                    >
                      10:00 AM-7:00 PM
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
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
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Count
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
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
                  <Typography sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}>{modalData?.count}</Typography>
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
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Sandwich count
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
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
                  <Typography sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}>0</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
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
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Total
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
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
                  <Typography sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}>{modalData?.count}</Typography>
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
                // alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Reason
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '15px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                    minHeight: '100px',
                  }}
                >
                  <Typography sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}>Health issues</Typography>
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
            <Button onClick={handleClose} variant="outlined">
              Decline
            </Button>
            <Button
              onClick={handleClose}
              sx={{ ml: '20px' }}
              variant="contained"
            >
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
    </>
  );
};

export default LeaveViewModal;
