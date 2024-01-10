import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const StatusBox = ({
  title,
  count,
  horizotalLineColor,
  backgroundColor,
  isEmployee,
  images,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: isEmployee ? '100%' : { xs: '100%', md: '300px' },
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
              {isEmployee ? title : count}
            </Typography>
          </Box>
          <Box>
            <Typography>{isEmployee ? count : title}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
          }}
        >
          {isEmployee ? (
            <img
              src="/icons/arrow-right.svg"
              style={{ width: '15px', height: '15px' }}
              alt="arrow"
            />
          ) : (
            <Image
              src={images}
              width={50}
              height={50}
              alt="employee"
              style={{
                marginRight: '10px',
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default StatusBox;
