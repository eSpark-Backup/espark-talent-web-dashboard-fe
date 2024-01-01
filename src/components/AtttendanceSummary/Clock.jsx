import React from 'react';
import { Box, Typography } from '@mui/material';

import { Clock_Dial } from '@/src/constants/employeeDashboard';

const Clock = () => {
  const [currentDate, setCurrentDate] = React.useState({
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
          mx: 'auto',
          width: { xs: '240px', sm: '240px' },
          height: { xs: '240px', sm: '240px' },
          backgroundColor: '#F6F7F8',
          backgroundImage: `url(${Clock_Dial})`,
          backgroundSize: 'cover',
          borderRadius: '100%',
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
          <Typography variant="h6">{currentDate?.day}</Typography>
          <Typography variant="h4">{currentDate?.hours}</Typography>
          <Typography variant="h6">
            {currentDate?.month}
            <Typography variant="h6" component={'span'} sx={{ ml: 0.5 }}>
              {currentDate?.date},{currentDate?.year}
            </Typography>
          </Typography>
          <Typography variant="h6">{currentDate?.city}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Clock;
