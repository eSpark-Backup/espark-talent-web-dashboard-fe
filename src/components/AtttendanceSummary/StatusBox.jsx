import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

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
            <Typography
              sx={{
                color: '#000',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography>{count}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // width: '10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
          }}
        >
          <Image
            width={15}
            height={15}
            src="/images/dashboard/icon-right.svg"
            alt="arrow"
          />
        </Box>
      </Box>
    </>
  );
};

export default StatusBox;
