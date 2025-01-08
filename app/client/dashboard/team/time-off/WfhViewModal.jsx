import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import dayjs from 'dayjs';
import { countWeekendsHandler } from '@/src/utils/helpers';

const WfhViewModal = ({
  title,
  modalData,
  handleClose,
  isEmployee,
  handleApproveRequest,
  handleRejectRequest,
  handleConfirm,
}) => {
  const approveRequestAndClose = () => {
    handleApproveRequest(modalData);
    handleClose();
  };
  const handleRejectRequestAndClose = () => {
    handleRejectRequest(modalData);
    handleClose();
  };

  const countOfWeekends = countWeekendsHandler(
    modalData.start_date,
    modalData.end_date
  );
  modalData = { ...modalData, count: modalData.count + countOfWeekends };
  return (
    <>
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '1480px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E4E4E4', py: 2, px: 2.8 }}>
          <Typography
            sx={{
              textAlign: { xs: 'center', sm: 'start' },
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
            }}
          ></Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Grid
              container
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
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
                    paddingLeft: { xs: '0px', md: '20px' },
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
                    background: '#FAFAFA',
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
                    {dayjs(modalData?.start_date).format('MMMM DD,YYYY')}
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
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#fff',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
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
                    paddingLeft: { xs: '0px', md: '20px' },
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
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    {dayjs(modalData?.end_date).format('MMMM DD,YYYY')}
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
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
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
                    paddingLeft: { xs: '0px', md: '20px' },
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
                    background: '#FAFAFA',
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
                    {modalData?.count - countOfWeekends}
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
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#fff',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
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
                    paddingLeft: { xs: '0px', md: '20px' },
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
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    {modalData?.reason}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                py: 2,
                pr: 0.5,
              }}
            >
              {modalData?.status === 'completed' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{ padding: '20px' }}
                >
                  <Button
                    sx={{
                      minWidth: { xs: '100px', md: '120px' },
                    }}
                    onClick={handleClose}
                    variant="outlined"
                    disabled
                  >
                    Approved
                  </Button>
                  <Button
                    sx={{
                      ml: '20px',
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                    variant="outlined"
                  >
                    close
                  </Button>
                </Box>
              ) : modalData?.status === 'reject' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{ padding: '20px' }}
                >
                  <Button
                    sx={{
                      minWidth: { xs: '100px', md: '120px' },
                    }}
                    onClick={handleClose}
                    variant="outlined"
                    disabled
                  >
                    Declined
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      ml: '20px',
                      width: { xs: '105px', sm: '120px' },
                      height: '40px',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              ) : !isEmployee && modalData?.status === 'pending' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Button
                    sx={{
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleRejectRequestAndClose}
                    variant="outlined"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={approveRequestAndClose}
                    sx={{
                      ml: '20px',
                      minWidth: { xs: '100px', md: '120px' },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    variant="contained"
                  >
                    Approve
                  </Button>
                </Box>
              ) : isEmployee && modalData?.status === 'pending' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Button
                    sx={{
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                    variant="outlined"
                  >
                    close
                  </Button>
                  <Button
                    onClick={() => handleConfirm(modalData.id)}
                    sx={{
                      ml: '20px',
                      minWidth: { xs: '100px', md: '120px' },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    variant="contained"
                  >
                    Delete request
                  </Button>
                </Box>
              ) : modalData?.status === 'rejected' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{ padding: '20px' }}
                >
                  <Button
                    sx={{
                      minWidth: { xs: '100px', md: '120px' },
                    }}
                    onClick={handleClose}
                    variant="outlined"
                    disabled
                  >
                    Declined
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      ml: '20px',
                      width: { xs: '105px', sm: '120px' },
                      height: '40px',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              ) : (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Button
                    sx={{
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                    variant="outlined"
                  >
                    close
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {!isEmployee && (
          <>
            {modalData?.status === 'Pending' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{
                  padding: '20px',
                }}
              >
                <Button
                  sx={{
                    minWidth: {
                      xs: '100px',
                      md: '120px',
                    },
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  Decline
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    ml: '20px',
                    minWidth: { xs: '100px', md: '120px' },
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
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
                <Button
                  sx={{ minWidth: '120px', border: '2px solid red' }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  {modalData?.status}
                </Button>
              </Box>
            ) : null}
          </>
        )}
        {isEmployee && (
          <>
            {modalData?.status === 'Pending' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{ padding: '20px' }}
              >
                <Button
                  sx={{ minWidth: '120px', textTransform: 'math-auto' }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel request
                </Button>
              </Box>
            ) : modalData?.status === 'Completed' ||
              modalData?.status === 'Rejected' ||
              modalData?.status === 'Cancelled' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{ padding: '20px' }}
              >
                <Button
                  sx={{ minWidth: '120px' }}
                  onClick={handleClose}
                  variant="contained"
                >
                  Close
                </Button>
              </Box>
            ) : null}
          </>
        )}
      </Box>
    </>
  );
};

export default WfhViewModal;
