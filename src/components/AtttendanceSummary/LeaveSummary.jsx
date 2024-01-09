import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import ProgressBar from './ProgressBar';
import {
  Leave_Summary_Boxes,
  Leave_Summary_Title,
} from '@/src/constants/employeeDashboard';

const LeaveSummary = () => {
  return (
    <>
      <Box
        sx={{
          height: { xs: 'auto', md: '430px' },
          borderRadius: '10px',
          background: '#FFF',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 2.5,
            height: '70px',
            borderRadius: '10px 10px 0px 0px',
            borderBottom: '1px solid #E4E4E4',
            background: '#FFF',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '18px', md: '25px' },
              fontWeight: 600,
              color: '#171717',
              fontStyle: 'normal',
              lineHeight: 'normal',
            }}
          >
            {Leave_Summary_Title}
          </Typography>
        </Box>
        <Box
          sx={{
            px: { xs: 3, sm: '25px' },
            pt: '11px',
            width: '100%',
            height: '360px',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {Leave_Summary_Boxes &&
            Leave_Summary_Boxes?.map((item, index) => (
              <Box sx={{ flexGrow: 1 }} key={index}>
                <Grid
                  container
                  sx={{
                    height: { xs: 'auto', md: '100px' },
                    borderRadius: '5px',
                    px: '14px',
                    py: { xs: '15px', md: '29px' },
                    mb: '20px',
                    border: '1px solid #E4E4E4',
                    background: '#FFF',
                    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                  }}
                  spacing={0}
                >
                  <Grid item xs={12} sm={2.2} md={3.5} lg={2.5} xl={3.2}>
                    <Box
                      sx={{
                        Width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{ fontSize: '14px', width: '100%' }}
                        variant="h6"
                        color="text.secondary"
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '12px' }}
                        variant="body1"
                        color="text.secondary"
                      >
                        {item?.subtitle}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9.8} md={8.5} lg={9.5} xl={8.8}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        '@media (min-width: 1200px) and (max-width: 1919px) ': {
                          paddingLeft: 2.2,
                        },
                        '@media (min-width: 900px) and (max-width: 1199px) ': {
                          paddingLeft: 2.2,
                        },
                        '@media (min-width: 600px) and (max-width: 899px) ': {
                          paddingLeft: 2.2,
                        },
                        flexDirection: 'column',
                        pt: 0.9,
                        gap: 1.5,
                      }}
                    >
                      <ProgressBar />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {item?.leaveType &&
                          item?.leaveType?.map((type, index) => (
                            <div key={index} style={{ marginRight: '10px' }}>
                              <Box
                                sx={{
                                  width: 'auto',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {type?.circleColor && (
                                  <Box
                                    sx={{
                                      width: '6px',
                                      height: '6px',
                                      backgroundColor: `${type?.circleColor}`,
                                      borderRadius: '50%',
                                      mr: '5px',
                                    }}
                                  />
                                )}
                                <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <Typography
                                    sx={{
                                      color: '#595959',
                                      textAlign: 'center',
                                      fontSize: '10px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal',
                                    }}
                                  >
                                    {type?.title}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: '#171717',
                                      textAlign: 'center',
                                      fontSize: '12px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal',
                                    }}
                                  >
                                    {type?.quantity}
                                  </Typography>
                                </Box>
                              </Box>
                            </div>
                          ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default LeaveSummary;
