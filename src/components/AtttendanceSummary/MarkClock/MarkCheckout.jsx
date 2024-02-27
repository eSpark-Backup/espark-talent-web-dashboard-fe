import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { markCheckout } from '@/src/redux/slices/employeeSlices/empHomeSlice';
import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';

const MarkCheckOut = ({ setEndTime }) => {
  const dispatch = useDispatch();
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const [time, setTime] = useState('');
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const url = `${EMP_HOME}/?workspace=${workSpace?.email}&check_out=${data.time}`;
      return api.patchData(url);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      dispatch(markCheckout(time));
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleCheckout = () => {
    const data = {
      time: dayjs().format('hh:mm A'),
    };
    setEndTime(data?.time);
    setTime(data?.time);
    mutate(data);
    console.log({ data });
  };
  return (
    <Grid item xs={12} md={6} lg={6} xl={6}>
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: '10px',
          width: '100%',
          height: '50px',
          color: '#fff',
          background: '#068987',
          '&:hover': {
            color: '#fff',
            background: '#068987',
          },
        }}
        onClick={handleCheckout}
      >
        <Typography
          sx={{
            color: '#FFF',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            ml: '10px',
            textTransform: 'math-auto',
          }}
        >
          {PUNCH_IN?.markCheckOut}
        </Typography>
      </Button>
    </Grid>
  );
};

export default MarkCheckOut;
