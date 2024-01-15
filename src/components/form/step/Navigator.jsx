import { Box, Typography } from '@mui/material';
import React from 'react';

const Navigator = ({ formSteps, currentStep }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        // height: "150px",
        padding: '35px 0px 66px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: '0',
        borderRadius: '10px 10px 0px 0px',
        background: '#029894',
      }}
    >
      {formSteps?.map(({ title, countNo }, stepIndex) => {
        return (
          <Box
            key={stepIndex}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              position={'relative'}
            >
              <Box
                sx={{
                  borderRadius: '50px',
                  width: { xs: '25px', sm: '50px' },
                  height: { xs: '25px', sm: '50px' },
                  border: '1px solid #FFF',
                  // background: "#068987",
                  background: countNo === currentStep ? '#068987' : '#CFF0F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    // color: "#FFF",
                    color: countNo === currentStep ? '#FFF' : '#595959',
                    fontSize: { xs: '12px', sm: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  {countNo}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '55px',
                  position: 'absolute',
                  bottom: '-30px',
                }}
              >
                <Typography
                  sx={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontSize: { xs: '8px', sm: '10px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    minHeight: '24px',
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>
            {stepIndex < formSteps.length - 1 && (
              <Box
                sx={{
                  width: { xs: '30px', sm: '50px' },
                  height: '2px',
                  flexShrink: '0',
                  border: '0.5px solid #FFF',
                  background: '#FFF',
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Navigator;
