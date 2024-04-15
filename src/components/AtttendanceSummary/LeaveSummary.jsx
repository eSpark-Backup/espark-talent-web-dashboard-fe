import React from 'react';
import { Box, Typography } from '@mui/material';

import ProgressBar from './ProgressBar';
import {
  Leave_Summary_Boxes,
  Leave_Summary_Title,
} from '@/src/constants/employeeDashboard';
import { useSelector } from 'react-redux';

const LeaveSummary = () => {
  const { homeData } = useSelector((state) => state?.emp?.home);

  return (
    <>
      {Object.keys(homeData).length ? (
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
                fontSize: { xs: '20px', md: '23px', lg: '25px' },
                textAlign: { xs: 'center', sm: 'left' },
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
              px: { xs: 3, sm: '18px' },
              pt: '18px',
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
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    height: { xs: 'auto', md: '100px' },
                    borderRadius: '5px',
                    px: '14px',
                    py: { xs: '15px', md: '29px' },
                    mb: '18px',
                    border: '1px solid #E4E4E4',
                    background: '#FFF',
                    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                    '@media (min-width: 900px) and (max-width: 936px)': {
                      flexDirection: 'column',
                      height: 'auto',
                      py: 1,
                    },
                    '@media (min-width: 280px) and (max-width: 450px)': {
                      flexDirection: 'column',
                      height: 'auto',
                      py: 1,
                    },
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      width: '120px',
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
                      sx={{
                        fontSize: '12px',
                        '@media (min-width: 1100px) and (max-width: 1300px)': {
                          fontSize: '10px',
                        },
                      }}
                      variant="body1"
                      color="text.secondary"
                    >
                      {item?.subtitle}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 'calc(100% - 120px)',
                      display: 'flex',
                      flexDirection: 'column',
                      pt: 0.9,
                      gap: 1.5,
                      '@media (min-width: 900px) and (max-width: 936px)': {
                        width: '100%',
                      },
                      '@media (min-width: 280px) and (max-width: 450px)': {
                        width: '100%',
                      },
                    }}
                  >
                    <ProgressBar />
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', rowGap: 0.9 }}
                    >
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
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
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
                                  {
                                    homeData?.leave_summary[item?.name][
                                      type?.name
                                    ]
                                  }
                                </Typography>
                              </Box>
                            </Box>
                          </div>
                        ))}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default LeaveSummary;
