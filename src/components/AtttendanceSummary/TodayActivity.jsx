import { Timeline_Data } from '@/src/constants/employeeDashboard';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const TodayActivity = () => {
  const { today_activity } = useSelector((state) => state?.emp?.home?.homeData);

  return (
    <Box
      sx={{
        mx: { xs: 'auto', md: 0 },
        width: { xs: 'auto', md: 'auto' },
        height: '470px',
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
            fontSize: '25px',
            fontWeight: 600,
            '@media (min-width: 1300px) and (max-width: 1430px)': {
              fontSize: '20px',
            },
            '@media (min-width: 900px) and (max-width: 1300px)': {
              fontSize: '18px',
            },
          }}
        >
          Today Activity
        </Typography>
      </Box>
      <Box
        sx={{
          px: { xs: 3, sm: 3, lg: 3 },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: 'calc(100% - 70px)',
        }}
      >
        <Box>
          {Timeline_Data.map(({ title, name }, index) => (
            <Box
              key={index}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  border: 'solid 2px #068987',
                  borderRadius: '50%',
                  position: 'relative',
                }}
                display={'flex'}
                alignItems={'center'}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: '40px',
                    width: '150px',
                    top: 0,
                  }}
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <Typography
                    sx={{
                      color: '#171717',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                      display: 'flex',
                      marginTop: '10px',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Image
                      src={'/icons/ClockIcon.svg'}
                      width={20}
                      height={20}
                    />{' '}
                    {today_activity?.[name]}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '2px',
                  height: '60px',
                  background: '#ccc',
                }}
              ></Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TodayActivity;
