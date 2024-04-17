import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import MarkCheckIn from './MarkCheckin';
import MarkCheckOut from './MarkCheckout';
import MarkBreak from './MarkBreak';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';

const MarkClock = ({ data, isLoading }) => {
  const {
    title,
    clock_icon,
    expected_start_time,
    expected_end_time,
    break_out_icon,
  } = data || {};
  const { homeData } = useSelector((state) => state?.emp?.home);
  const [elapsedTimeString, setElapsedTimeString] = useState('00:00:00');
  const [percentage, setPercentage] = useState(0);
  const parseTime = (timeString) => {
    if (timeString) {
      const [time, period] = timeString.split(' ');
      const [hours, minutes] = time.split(':');
      let hoursInt = parseInt(hours, 10);
      if (period === 'PM' && hoursInt !== 12) {
        hoursInt += 12;
      }
      const currentDate = new Date();
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hoursInt,
        parseInt(minutes, 10)
      );
    }
  };
  const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };
  useEffect(() => {
    let interval;
    if (
      homeData?.today_activity?.check_in !== '-' &&
      homeData?.today_activity?.check_out === '-'
    ) {
      const start = parseTime(homeData?.today_activity?.check_in);
      interval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = (currentTime.getTime() - start.getTime()) / 1000;
        const totalTime = 9 * 3600;
        const calculatedPercentage = (elapsedTime / totalTime) * 100;
        if (calculatedPercentage >= 100) {
          clearInterval(interval);
          setPercentage(100);
        } else {
          setPercentage(calculatedPercentage);
        }
      }, 1000);
    } else if (
      homeData?.today_activity?.check_in !== '-' &&
      homeData?.today_activity?.check_out !== '-'
    ) {
      const start = parseTime(homeData?.today_activity?.check_in);
      const end = parseTime(homeData?.today_activity?.check_out);
      if (start && end) {
        const elapsedTime = (end.getTime() - start.getTime()) / 1000;
        const totalTime = 9 * 3600;
        const calculatedPercentage = (elapsedTime / totalTime) * 100;
        if (calculatedPercentage >= 100) {
          setPercentage(100);
        } else {
          setPercentage(calculatedPercentage);
        }
      }
    }

    return () => clearInterval(interval);
  }, [homeData?.today_activity?.check_in, homeData?.today_activity?.check_out]);
  useEffect(() => {
    let interval;
    if (
      homeData?.today_activity?.check_in !== '-' &&
      homeData?.today_activity?.check_out === '-'
    ) {
      const start = parseTime(homeData?.today_activity?.check_in);
      interval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = (currentTime.getTime() - start.getTime()) / 1000;
        const formattedTime = secondsToTime(elapsedTime);
        setElapsedTimeString(formattedTime);
      }, 1000);
    } else if (
      homeData?.today_activity?.check_in !== '-' &&
      homeData?.today_activity?.check_out !== '-'
    ) {
      const start = parseTime(homeData?.today_activity?.check_in);
      const end = parseTime(homeData?.today_activity?.check_out);
      if (start && end) {
        const elapsedTime = (end.getTime() - start.getTime()) / 1000;
        const formattedTime = secondsToTime(elapsedTime);
        setElapsedTimeString(formattedTime);
      }
    }

    return () => clearInterval(interval);
  }, [homeData?.today_activity?.check_in, homeData]);

  return (
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
          minHeight: '70px',
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
          {title || ''}
        </Typography>
      </Box>
      {isLoading ? (
        <Stack
          p={5}
          height={'80%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box
            component={'img'}
            src="/icons/no-record-found.svg"
            width={'auto'}
            height={'auto'}
            alt="arrow"
          />
        </Stack>
      ) : (
        <Box>
          <Box
            sx={{
              px: { xs: 3, sm: 3, lg: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              rowGap: { xs: 0.7, sm: 0 },
              pt: 4.2,
              pb: 3,
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            display={'flex'}
          >
            <Typography
              sx={{
                color: '#595959',
                fontSize: { xs: '17px', sm: '20px' },
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {PUNCH_IN?.checkIn}
            </Typography>

            <Box display={'flex'} alignItems={'center'}>
              <Image
                src={clock_icon || ''}
                width={25}
                height={25}
                alt="Clock"
              />
              <Typography
                sx={{
                  color: '#171717',
                  textAlign: 'center',
                  fontSize: { xs: '14px', sm: '16px' },
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  mx: '10px',
                }}
              >
                {homeData?.today_activity?.check_in}
              </Typography>
              <Typography
                sx={{
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: { xs: '13px', sm: '14px' },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                {expected_start_time || ''}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              px: { xs: 3, sm: 3, lg: 3 },
              width: '100%',
              flexDirection: { xs: 'column', sm: 'row' },
              rowGap: { xs: 0.7, sm: 0 },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            display={'flex'}
          >
            <Typography
              sx={{
                color: '#595959',
                fontSize: { xs: '17px', sm: '20px' },
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {PUNCH_IN?.checkOut}
            </Typography>
            <Box display={'flex'} alignItems={'center'}>
              <Image
                src={clock_icon || ''}
                width={25}
                height={25}
                alt="Clock"
              />
              <Typography
                sx={{
                  color: '#171717',
                  textAlign: 'center',
                  fontSize: { xs: '14px', sm: '16px' },
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  mx: '10px',
                }}
              >
                {homeData?.today_activity?.check_out}
              </Typography>
              <Typography
                sx={{
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: { xs: '13px', sm: '14px' },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                {expected_end_time || ''}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ py: '23px' }}>
            <Box
              sx={{
                height: '40px',
                mx: { xs: 3, sm: 3, lg: 3 },
                border: 'solid 1px #E4E4E4',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
              }}
              display={'flex'}
            >
              <Box
                sx={{
                  width: `${percentage}%`,
                  background: '#E6F4F4',
                  height: '100%',
                }}
              ></Box>
              <Box
                sx={{
                  width: `${100 - percentage}%`,
                  background: '#F5F5F5',
                  height: '100%',
                }}
              ></Box>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 'calc(50% - 24px)',
                  top: 'calc(50% - 8px)',
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                {elapsedTimeString}
              </Typography>
            </Box>
          </Box>
          <Box
            gap={'20px'}
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              mx: { xs: 3, sm: 3, lg: 3 },
              borderRadius: '5px',
              position: 'relative',
            }}
            display={'flex'}
          >
            <MarkCheckIn />
            <MarkCheckOut />
          </Box>
          <MarkBreak icon={break_out_icon} />
        </Box>
      )}
    </Box>
  );
};

export default MarkClock;
