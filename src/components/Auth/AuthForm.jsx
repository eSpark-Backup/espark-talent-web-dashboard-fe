import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, IconButton, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useFormik } from 'formik';
import Cookie from 'js-cookie';

import { AuthSchema } from '../form/schemas/loginAccount';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  getEmployeeDetails,
  getWorkSpace,
  login,
} from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CLIENT_ROLES, EMPLOYEE_ROLES } from '@/src/constants/data/roles';
import { getHomeData } from '@/src/redux/slices/hrSlices/homeSlice';
import {
  CLIENT_HOME,
  EMP_HOME,
  HR_HOME,
} from '@/src/services/apiService/apiEndPoints';
import { getEmpHomeData } from '@/src/redux/slices/employeeSlices/empHomeSlice';
import {
  fetchClientHomeDataRequest,
  fetchClientHomeDataRequestFailed,
  fetchClientHomeDataRequestSuccess,
} from '@/src/redux/slices/clientSlices/homeSlice';

const AuthForm = ({ uiData, fields, handleOpenTroubleModal }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { title, checkText, havingTrouble } = uiData || {};
  const { workSpace } = useSelector((state) => state?.auth?.userData);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();
  const hrHomeMutation = useMutation({
    mutationFn: async (url) => {
      return api.getData(url);
    },
    onSuccess: ({ data }) => {
      dispatch(getHomeData(data));
      router.push('hr/dashboard');
      return data;
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const clientHomeMutation = useMutation({
    mutationFn: async (url) => {
      dispatch(fetchClientHomeDataRequest());
      return api.getData(url);
    },
    onSuccess: ({ data }) => {
      dispatch(fetchClientHomeDataRequestSuccess(data));
      router.push('client/dashboard');
      return data;
    },
    onError: (err) => {
      dispatch(fetchClientHomeDataRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const employeeHomeMutation = useMutation({
    mutationFn: async (url) => {
      return api.getData(`${url}/?workspace=${workSpace?.email || ''}`);
    },
    onSuccess: ({ data }) => {
      // dispatch(getHomeData(data));
      dispatch(getEmpHomeData(data));
      dispatch(getWorkSpace(data?.workspaces?.[0]));
      dispatch(getEmployeeDetails(data?.employee_details));
      router.push('employee/dashboard');
      return data;
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      return api.login(formVals);
    },
    onSuccess: ({ data }) => {
      dispatch(login(data));
      Cookie.set('token', data?.token);
      Cookie.set('userType', data?.role);
      console.log({ data });
      if (CLIENT_ROLES.includes(data?.role)) {
        setTimeout(() => {
          clientHomeMutation.mutate(CLIENT_HOME);
        }, 100);
      } else if (EMPLOYEE_ROLES.includes(data?.role)) {
        setTimeout(() => {
          employeeHomeMutation.mutate(EMP_HOME);
        }, 100);
      } else {
        setTimeout(() => {
          hrHomeMutation.mutate(HR_HOME);
        }, 100);
      }
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthSchema,
    onSubmit: (values) => {
      try {
        mutate(values);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'primary',
          display: 'flex',
          maxWidth: '777px',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto',
          pr: { xs: 2.5, sm: 4.5 },
          pl: { xs: 2.5, sm: 4.5, lg: 0 },
        }}
      >
        <Typography
          component="h3"
          variant="h3"
          sx={{ my: 2, color: '#171717' }}
        >
          {title || ''}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik?.handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          {fields?.map((field, index) => (
            <Box key={index}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {field?.label}
              </Typography>
              <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
                <OutlinedInput
                  sx={{
                    height: '40px',
                    color: '#666666',
                    fontSize: '14px',
                    fontFamily: 400,
                    '& fieldset': { border: '1px solid #E4E4E4' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid #E4E4E4',
                    },
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #E4E4E4',
                      },
                    },
                  }}
                  inputProps={{ style: { height: '8px' } }}
                  required
                  fullWidth
                  placeholder={field?.placeHolder}
                  type={
                    field?.type && field?.type === 'password'
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : null
                  }
                  value={formik.values[field?.type] || ''}
                  name={field.name}
                  onChange={(e) =>
                    formik.setFieldValue(field?.name, e.target.value)
                  }
                  error={
                    formik?.touched[field?.type] &&
                    Boolean(formik?.errors[field?.type])
                  }
                  endAdornment={
                    field.label === 'Password:' ? (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          sx={{
                            color: '#595959',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              color: '#595959',
                            },
                          }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  }
                />
                {formik?.touched[field?.type] && formik.errors[field?.type] && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ fontSize: '12px', mt: 1 }}
                  >
                    {formik.errors[field?.type]}
                  </Typography>
                )}
              </FormControl>
            </Box>
          ))}

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              '@media (max-width: 400px)': {
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 0.5,
              },
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              sx={{
                fontSize: '14px',
                fontFamily: 400,
                '@media (max-width: 400px)': {
                  order: { xs: 2, sm: 1 },
                  width: '100%',
                },
                width: 'auto',
                color: '#666',
                '& .MuiCheckbox-root': {
                  color: '#E4E4E4',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-checked': {
                    color: 'primary !important',
                  },
                },
              }}
              control={
                <Checkbox
                  disableRipple
                  value="remember"
                  color="primary"
                  sx={{ border: '1px' }}
                />
              }
              label={checkText || ''}
            />
            <Typography
              onClick={handleOpenTroubleModal}
              variant="body1"
              component={'h6'}
              sx={{
                textDecoration: 'none',
                color: '#666',
                width: 'auto',
                cursor: 'pointer',
                '@media (max-width: 400px)': {
                  order: { xs: 1, sm: 2 },
                  width: '100%',
                },
              }}
            >
              {havingTrouble || ''}
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, fontSize: '16px', fontWeight: 600 }}
          >
            {title || ''}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AuthForm;
