import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const StatusBox = ({
  title,
  count,
  horizontalLineColor,
  backgroundColor,
  isHr,
  image,
  value,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: isHr ? '100%' : { xs: '100%', md: '100%' },
          height: '110px',
          borderRadius: '10px',
          background: `${backgroundColor}`,
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (min-width: 900px) and (max-width: 1290px)': {
            height: isHr ? '120px' : '110px',
            // width: isHr ? '200px' : '100%',
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
                backgroundColor: `${horizontalLineColor}`,
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
              {isHr ? count : title}
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
              {isHr ? title : value}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '25px',
          }}
        >
          {isHr ? (
            <Image
              src={image}
              width={50}
              height={50}
              alt="hrview"
              style={{
                marginRight: '10px',
              }}
            />
          ) : (
            <Image
              src="/icons/arrow-right.svg"
              width={15}
              height={15}
              alt="arrow"
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default StatusBox;
