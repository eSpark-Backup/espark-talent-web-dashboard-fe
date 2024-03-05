import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import { api } from '@/src/services/apiService';
import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { Button, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const MarkCheckIn = ({ setStartTime }) => {
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { homeData } = useSelector((state) => state?.emp?.home);
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return api.patchData(
        `${EMP_HOME}/?workspace=${workSpace?.email}&check_in=${data.check_in}`
      );
    },
    onSuccess: ({ data }) => {
      setStartTime();
      console.log({ data });
      //   dispatch(login(data));
      //   if (HR_ROLES.includes(data?.role)) {
      //     router.push('hr/dashboard');
      //   } else if(EMPLOYEE_ROLES.includes(data?.role)) {
      //     router.push('employee/dashboard');
      //   }
      //   else {
      //     router.push('client/dashboard');
      //   }
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleCheckIn = () => {
    if (homeData?.today_activity?.check_in !== '-') {
      return;
    } else {
      const data = {
        check_in: dayjs().format('hh:mm A'),
      };
      setStartTime(data?.check_in);
      mutate(data);
    }
  };
  return (
    <Grid item xs={12} md={6} lg={6} xl={6}>
      <Button
        sx={{
          border: '1px solid #E4E4E4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: '10px',
          width: '100%',
          height: '50px',
          cursor:
            homeData?.today_activity?.check_in !== '-' ? 'no-drop' : 'pointer',
          //   cursor: 'pointer',
          '&:hover': {
            color: '#068987',
            background: '#fff',
          },
        }}
        // disabled={homeData?.today_activity?.check_in}
        onClick={handleCheckIn}
      >
        <Typography
          sx={{
            color: '#595959',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            ml: '10px',
            textTransform: 'math-auto',
          }}
        >
          {PUNCH_IN?.markCheckIn}
        </Typography>
      </Button>
    </Grid>
  );
};

export default MarkCheckIn;
