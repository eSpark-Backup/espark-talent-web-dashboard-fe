import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, IconButton, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import { AuthSchema } from '../form/schemas/loginAccount';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { login } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const AuthForm = ({ uiData, fields }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState();
  const { title, checkText, forgotText, forgotLink } = uiData;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (key, val) => {
    setFormData({
      ...formData,
      [key]: val,
    });
  };
  // const router = useRouter();
  const { data, mutate } = useMutation({
    mutationFn: (formVals) => {
      return api.login(formVals);
    },
    onSuccess: () => {
      dispatch(login(data));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, 'formData');
    mutate(formData);
    // router.push('client/dashboard');
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthSchema,
    onSubmit: (values) => {
      try {
        console.log('Form values:', values);
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
          height: '100%',
          width: { xs: '80%', sm: '80%', md: '80%', lg: '55%' },
          mx: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3" sx={{ my: 2 }}>
          {title}
        </Typography>
        {/* <Box sx={{ display: 'flex', gap: 0.7 }}>
          <Typography>{text}</Typography>
          <Link href={link}>{linkText}</Link>
        </Box> */}
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
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
                    color: '#666',
                    fontSize: '14px',
                    fontFamily: 400,
                  }}
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
                  onBlur={formik.handleBlur(field?.type)}
                  error={
                    formik.touched[field?.type] &&
                    Boolean(formik.errors[field?.type])
                  }
                  endAdornment={
                    field.label === 'Password:' ? (
                      <InputAdornment position="end">
                        <IconButton
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
                {formik.touched[field?.type] && formik.errors[field?.type] && (
                  <Typography variant="body2" color="error">
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
                  value="remember"
                  color="primary"
                  sx={{ border: '1px' }}
                />
              }
              label={checkText}
            />
            <Link
              href={forgotLink}
              variant="body1"
              sx={{
                textDecoration: 'none',
                color: '#666',
                width: 'auto',
                '@media (max-width: 400px)': {
                  order: { xs: 1, sm: 2 },
                  width: '100%',
                },
              }}
            >
              {forgotText}
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, fontSize: '16px', fontWeight: 600 }}
          >
            {title}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AuthForm;
