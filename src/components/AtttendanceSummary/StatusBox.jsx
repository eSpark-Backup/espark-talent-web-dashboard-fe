import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const StatusBox = ({
  title,
  count,
  horizotalLineColor,
  backgroundColor,
  hrView,
  image,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: hrView ? '100%' : { xs: '100%', md: '300px' },
          height: '110px',
          borderRadius: '10px',
          background: `${backgroundColor}`,
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (min-width: 900px) and (max-width: 1275px)': {
            height: hrView ? '110px' : '150px',
          },
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
              {hrView ? title : count}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: '#595959',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {hrView ? count : title}
            </Typography>
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
          {hrView ? (
            <Image
              src="/icons/arrow-right.svg"
              width={15}
              height={15}
              alt="arrow"
            />
          ) : (
            <Image
              src={image}
              width={50}
              height={50}
              alt="hrview"
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
