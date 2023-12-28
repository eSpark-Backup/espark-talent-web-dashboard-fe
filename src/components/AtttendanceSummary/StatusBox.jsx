import React from 'react';
import { Box, Typography } from '@mui/material';

const StatusBox = ({ title, count, horizotalLineColor, backgroundColor }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '110px',
          borderRadius: '10px',
          background: `${backgroundColor}`,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'start',
            pl: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <hr
              style={{
                width: '27px',
                height: '2px',
                backgroundColor: `${horizotalLineColor}`,
              }}
            />
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box>
            <Typography>{count}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/icons/arrow-right.svg"
            style={{ width: '15px', height: '15px' }}
            alt="arrow"
          />
        </Box>
      </Box>
    </>
  );
};

export default StatusBox;
