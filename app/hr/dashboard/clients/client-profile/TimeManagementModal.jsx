import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';
import { api } from '@/src/services/apiService';
import { HR_EMP_TIME_AND_LEAVES } from '@/src/services/apiService/apiEndPoints';
import {
  updateEmpTime,
  updateEmpTimeRequest,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { validationSchema } from '@/src/schemas/timeManagementModal';

const TimeManagementModal = ({ open, onClose }) => {
  const { id } = useSelector((state) => state?.hr?.employees?.currentEmployee);
  const { time } = useSelector((state) => state?.hr?.employees?.timeAndLeaves);
  const { check_in, check_out } = (time && time[0]) || [];
  const dispatch = useDispatch();
  const clientQuery = useQueryClient();

  const [data, setData] = useState({
    check_in: check_in || '',
    check_out: check_out || '',
  });

  const [currentData, setCurrentData] = useState({
    check_in: '',
    check_out: '',
  });

  useEffect(() => {
    setData({
      check_in: check_in,
      check_out: check_out,
    });
  }, [time]);

  useEffect(() => {
    setCurrentData({
      check_in: dayjs(data?.check_in, 'hh:mm A')?.format('HH:mm'),
      check_out: dayjs(data?.check_out, 'hh:mm A')?.format('HH:mm'),
    });
  }, [data, time]);

  const handleSave = (values) => {
    const formattedData = {
      check_in: dayjs(values?.check_in, 'HH:mm')?.format('hh:mm A'),
      check_out: dayjs(values?.check_out, 'HH:mm')?.format('hh:mm A'),
    };
    setData(formattedData);
    mutate(formattedData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      dispatch(updateEmpTimeRequest());
      return api.updateJSONData(
        `${HR_EMP_TIME_AND_LEAVES}?id=${id}&tab=time`,
        formVals
      );
    },
    onSuccess: () => {
      dispatch(
        updateEmpTime([
          {
            check_in: dayjs(values?.check_in, 'HH:mm')?.format('hh:mm A'),
            check_out: dayjs(values?.check_out, 'HH:mm')?.format('hh:mm A'),
          },
        ])
      );
      Toast('success', 'Time updated successfully');
      onClose();
      clientQuery?.invalidateQueries(['employee-time-profile']);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: {
      check_in: currentData?.check_in || '',
      check_out: currentData?.check_out || '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: handleSave,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      disableScrollLock
      disableEnforceFocus
      disableRestoreFocus
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '1000px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflow: 'auto',
          scrollbarWidth: 'none',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '20px', sm: '22px', md: '25px' },
              fontWeight: 600,
              ml: '15px',
            }}
          >
            Time Management
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #068987',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
            }}
            onClick={handleCloseModal}
          >
            <Box component="img" src="/icons/Close.svg" />
          </Box>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              columnGap: 10,
              justifyContent: 'center',
              padding: { xs: '40px 20px', xl: '41px 20px' },
            }}
          >
            <Grid item xs={10} md={4.5}>
              <TextField
                sx={{
                  maxWidth: { xs: '100%', md: '300px' },
                  height: '40px',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    borderRadius: '5px',
                    '&:hover fieldset': {
                      borderColor: '#029894',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#029894',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#333333',
                  },
                  '& input[type="time"]::-webkit-calendar-picker-indicator': {
                    width: '22px',
                    height: '22px',
                    color: 'red',
                    cursor: 'pointer',
                  },
                }}
                fullWidth
                type="time"
                name="check_in"
                value={values?.check_in}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.check_in && !!errors?.check_in}
                helperText={touched?.check_in && errors?.check_in}
              />
            </Grid>
            <Grid item xs={10} md={4.5} pt={{ xs: 4, md: 0 }}>
              <TextField
                sx={{
                  maxWidth: { xs: '100%', md: '300px' },
                  height: '40px',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    borderRadius: '5px',
                    '&:hover fieldset': {
                      borderColor: '#029894',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#029894',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#333333',
                  },
                  '& input[type="time"]::-webkit-calendar-picker-indicator': {
                    width: '22px',
                    height: '22px',
                    color: 'red',
                    cursor: 'pointer',
                  },
                }}
                fullWidth
                type="time"
                name="check_out"
                value={values?.check_out}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.check_out && !!errors?.check_out}
                helperText={touched?.check_out && errors?.check_out}
              />
            </Grid>
            <Grid
              item
              xs={10}
              sm={10.8}
              pt={{ xs: 6.5, sm: 4 }}
              pl={{ xs: 0, sm: 4, lg: 4 }}
            >
              <Button
                sx={{ minWidth: { xs: '100%', sm: '120px' } }}
                variant="contained"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  'Save'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default TimeManagementModal;
