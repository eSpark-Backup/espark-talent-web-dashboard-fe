import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Clock_Title } from '@/src/constants/employeeDashboard';
import { Clock_Dial } from '@/src/constants/employeeDashboard';

const Clock = () => {
  const fontSize = {
    '@media (min-width: 1200px) and (max-width: 1300px)': {
      fontSize: '12px',
    },
  };
  const [currentDate, setCurrentDate] = useState({
    hours: '',
    minutes: '',
    seconds: '',
    day: '',
    date: '',
    month: '',
    year: '',
    city: '',
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Karachi',
      };
      setCurrentDate({
        hours: now.toLocaleTimeString([], { ...options, hour: 'numeric' }),
        minutes: now.toLocaleTimeString([], { ...options, hour: undefined }),
        seconds: now.toLocaleTimeString([], {
          ...options,
          hour: undefined,
          minute: undefined,
        }),
        day: now.toLocaleDateString('en-US', { weekday: 'long' }),
        date: now.getDate(),
        month: now.toLocaleDateString('en-US', { month: 'long' }),
        year: now.getFullYear(),
        city: 'Asia/Karachi',
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        sx={{
          mx: { xs: 'auto', md: 0 },
          // width: { xs: 'auto', md: '300px' },
          // height: '430px',
          height: '100%',
          borderRadius: '10px',
          background: '#fff',
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
            background: '#fff',
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
            {Clock_Title}
          </Typography>
        </Box>
        <Box
          sx={{
            px: { xs: 3, sm: 3, lg: 3 },
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: { xs: '100px', md: '60px' },
            paddingTop: { xs: '46px', md: '0px' },
            // paddingBottom: { xs: '46px', md: '0px' },
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              width: { xs: '240px', sm: '240px' },
              height: { xs: '240px', sm: '240px' },
              backgroundColor: '#F6F7F8',
              backgroundImage: `url(${Clock_Dial})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              '@media (min-width: 280px) and (max-width: 320px)': {
                backgroundImage: 'none',
              },
              '@media (min-width: 1300px) and (max-width: 1500px)': {
                width: '250px',
                height: '180px',
                backgroundImage: 'none',
              },
              '@media (min-width: 1200px) and (max-width: 1300px)': {
                width: '270px',
                height: '160px',
                backgroundImage: 'none',
              },
              borderRadius: { xs: '80%', md: '100%' },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                gap: 0.8,
              }}
            >
              <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                {currentDate?.day}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  '@media (min-width: 1200px) and (max-width: 1300px)': {
                    fontSize: '20px',
                  },
                }}
              >
                {currentDate?.hours}
              </Typography>
              <Typography
                sx={{ fontSize: '16px', fontWeight: 400, ...fontSize }}
              >
                {currentDate?.month}
                <Typography
                  component={'span'}
                  sx={{
                    ml: 0.5,
                    fontSize: '16px',
                    fontWeight: 400,
                    ...fontSize,
                  }}
                >
                  {currentDate?.date},{currentDate?.year}
                </Typography>
              </Typography>
              <Typography
                sx={{ fontSize: '16px', fontWeight: 400, ...fontSize }}
              >
                {currentDate?.city}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Clock;
