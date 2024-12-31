import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const WFHRequestDataView = ({
  modalData,
  handleClose,
  handleApproveRequest,
  handleRejectRequest,
  isEmployee,
}) => {
  const createPunchRequestViewData = [
    {
      title: 'Start Date *',
      value: modalData?.start_date || '',
      suffixIcon: 'CalendarOutline',
    },
    {
      title: 'End Date *',
      value: modalData?.end_date || '',
      suffixIcon: 'CalendarOutline',
    },
    {
      title: 'Count',
      value: modalData?.count || '',
    },
    {
      title: 'Reason *',
      value: modalData?.reason || 'Reason',
    },
  ];

  const approveRequestAndClose = () => {
    handleApproveRequest(modalData);
    handleClose();
  };
  const handleRejectRequestAndClose = () => {
    handleRejectRequest(modalData);
    handleClose();
  };

  return (
    <Box
      sx={{
        padding: { xs: '20px 15px', sm: '26px', md: '28px' },
      }}
    >
      {createPunchRequestViewData?.map(
        ({ title, value, suffixIcon }, dataIndex) => (
          <Box key={dataIndex}>
            <Box
              sx={{
                padding: '5px 10px',
              }}
            >
              <Grid
                container
                sx={{
                  p: { xs: '0px 0px 5px 0px', md: '5px 5px 5px 20px' },
                  background: !(dataIndex % 2) ? '#F6F6F6' : '#FFF',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: {
                    xs: 'flex-start',
                    md: title !== 'Description' && 'center',
                  },
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: '10px', md: '0px' },
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
                      paddingLeft: { xs: '0px', md: '20px' },
                      pt: title === 'Description' && '10px',
                    }}
                  >
                    {title}
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
                        minHeight: title === 'Description' && '90px',
                      }}
                    >
                      {value}
                    </Typography>
                    {suffixIcon && (
                      <Image
                        src={`/icons/${suffixIcon}.svg`}
                        alt={title}
                        width={20}
                        height={20}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )
      )}
      {modalData?.status === 'completed' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
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
      ) : modalData?.status === 'rejected' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          {/* <Button
            type="submit"
            variant="outlined"
            disabled
            sx={{
              width: { xs: '105px', sm: '120px' },
              height: '40px',
              fontSize: '16px',
              fontWeight: 600,
            }}
            onClick={handleClose}
          >
            Declined
          </Button> */}
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
      ) : !isEmployee && modalData?.status === 'pending' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px', marginBottom: '15px' }}
        >
          <Button
            onClick={handleRejectRequestAndClose}
            sx={{
              ml: '20px',
              width: '150px',
              '&:hover': {
                background: '#029894',
              },
            }}
            variant="contained"
          >
            Decline
          </Button>
          <Button
            onClick={approveRequestAndClose}
            sx={{
              ml: '20px',
              width: '150px',
              border: '1px solid #029894',
              background: '#FFF',
            }}
          >
            Approve
          </Button>
        </Box>
      ) : (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px', marginBottom: '15px' }}
        >
          <Button
            onClick={handleClose}
            sx={{
              ml: { xs: 0, md: '20px' },
              width: { xs: '100%', md: '120px' },
              '&:hover': {
                background: '#029894',
              },
            }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WFHRequestDataView;
