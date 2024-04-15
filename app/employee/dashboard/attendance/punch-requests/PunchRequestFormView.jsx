import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { getCamelCapitalized } from '@/src/utils/stringModification';

const PunchRequestDataView = ({ modalData, handleClose }) => {
  const createPunchRequestViewData = [
    {
      title: 'Date',
      value: 'Jan 18, 2023',
      suffixIcon: 'CalendarOutline',
    },
    {
      title: 'Punch time',
      value: modalData?.punchType === 'Check in' ? '10:00 AM' : '07:00 PM',
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

  return (
    <Box p={'28px'}>
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
      {modalData?.status === 'Pending' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px', marginBottom: '15px' }}
        >
          <Button
            onClick={handleClose}
            sx={{
              ml: '20px',
              width: '150px',
              '&:hover': {
                background: '#029894',
              },
            }}
            variant="contained"
          >
            Close
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              ml: '20px',
              width: '150px',
              border: '1px solid #029894',
              background: '#FFF',
            }}
          >
            Delete Request
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

export default PunchRequestDataView;
