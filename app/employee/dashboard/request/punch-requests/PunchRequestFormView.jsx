import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { getCamelCapitalized } from '@/src/utils/stringModification';

const PunchRequestDataView = ({
  modalData,
  handleClose,
  handleApproveRequest,
  handleRejectRequest,
  isEmployee,
  handleConfirmDelete,
}) => {
  const createPunchRequestViewData = [
    {
      title: 'Date',
      value: modalData?.date || 'Jan 18, 2023',
      suffixIcon: 'CalendarOutline',
    },
    {
      title: 'Punch time',
      value: modalData?.punch_time || '10:00 AM',
    },
    {
      title: 'Punch type',
      value: getCamelCapitalized(modalData?.punch_type),
    },
    {
      title: 'Description',
      value: modalData?.description || 'Write your description',
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
                        textTransform: 'capitalize',
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
      {isEmployee && modalData?.status === 'completed' ? (
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
      ) : !isEmployee && modalData?.status === 'completed' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          <Button
            type="submit"
            variant="outlined"
            sx={{
              width: { xs: '105px', sm: '120px' },
              height: '40px',
              fontSize: '16px',
              fontWeight: 600,
            }}
            onClick={handleClose}
          >
            Closed
          </Button>
        </Box>
      ) : isEmployee && modalData?.status === 'rejected' ? (
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
      ) : !isEmployee && modalData?.status === 'rejected' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          <Button
            type="submit"
            variant="outlined"
            sx={{
              width: { xs: '105px', sm: '120px' },
              height: '40px',
              fontSize: '16px',
              fontWeight: 600,
            }}
            onClick={handleClose}
          >
            Closed
          </Button>
        </Box>
      ) : isEmployee && modalData?.status === 'pending' ? (
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
          <Button
            onClick={() => {
              handleConfirmDelete(modalData?.id);
              handleClose();
            }}
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
            type="submit"
            variant="outlined"
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
              '&:hover': {
                color: '#fff',
                backgroundColor: '#029894',
              },
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
              ml: '20px',
              minWidth: {
                xs: '100px',
                md: '120px',
              },
              fontSize: '16px',
              fontWeight: 600,
            }}
            variant="outlined"
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PunchRequestDataView;
