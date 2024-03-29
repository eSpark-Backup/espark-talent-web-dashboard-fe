import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import { Box, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { api } from '@/src/services/apiService';
import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { useState } from 'react';
import {
  markBreak,
  markResume,
} from '@/src/redux/slices/employeeSlices/empHomeSlice';

const MarkBreak = () => {
  const [time, setTime] = useState('');
  const [timerState, setTimerState] = useState({
    startTime: null,
    elapsedTime: 0,
    timerActive: false,
  });

  const dispatch = useDispatch();
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { homeData } = useSelector((state) => state?.emp?.home);

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      let url = `${EMP_HOME}/?workspace=${workSpace?.email}&break=${data.time}`;
      if (homeData?.today_activity?.break !== '-') {
        url = `${EMP_HOME}/?workspace=${workSpace?.email}&resume=${data.time}`;
      }
      return api.patchData(url);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      if (homeData?.today_activity?.break === '-') {
        dispatch(markBreak(time));
      } else {
        dispatch(markResume(time));
      }
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleToggleBreak = () => {
    if (
      homeData?.today_activity?.resume &&
      homeData?.today_activity?.resume !== '-'
    ) {
      return;
    } else {
      const data = {
        time: dayjs().format('hh:mm A'),
      };
      if (timerState.timerActive) {
        pauseTimer();
      } else {
        startTimer();
      }
      setTime(data?.time);
      mutate(data);
    }
  };
  const startTimer = () => {
    const startTime = new Date().getTime();

    // Start interval to update elapsed time
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;

      // Update the timer state with the new elapsed time
      setTimerState((prevState) => ({
        ...prevState,
        elapsedTime: elapsedTime,
      }));
    }, 1000);
    setTimerState((prevState) => ({
      ...prevState,
      startTime: startTime,
      intervalId: intervalId,
      timerActive: true,
    }));
  };

  const pauseTimer = () => {
    clearInterval(timerState.intervalId);
    const now = new Date().getTime();
    const elapsed = now - timerState.startTime;
    setTimerState((prevState) => ({
      ...prevState,
      elapsedTime: prevState.elapsedTime + elapsed,
      timerActive: false,
    }));
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <Box sx={{ py: { xs: '30px', md: 0 } }}>
      <Box
        sx={{
          height: '50px',
          mx: { xs: 3, sm: 3, lg: 3 },
          my: { xs: 0, md: '30px' },
          borderRadius: '5px',
          position: 'relative',
        }}
        display={'flex'}
      >
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: '10px',
            width: '100%',
            height: '50px',
            color: '#068987',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'math-auto',
            cursor:
              homeData?.today_activity?.resume &&
              homeData?.today_activity?.resume !== '-'
                ? 'no-drop'
                : 'pointer',
            '&:hover': {
              color: '#068987',
              background: '#fff',
            },
          }}
          onClick={handleToggleBreak}
        >
          <Image
            src="/icons/TeaIcon1.svg"
            style={{ marginRight: '10px' }}
            width={20}
            height={20}
          />
          {homeData?.today_activity?.break === '-'
            ? PUNCH_IN?.markBreakout
            : PUNCH_IN?.markBreakin}
          {timerState.timerActive && (
            <span>&nbsp; {formatTime(timerState.elapsedTime)}</span>
          )}
        </Button>
      </Box>
    </Box>
  );
};
export default MarkBreak;
