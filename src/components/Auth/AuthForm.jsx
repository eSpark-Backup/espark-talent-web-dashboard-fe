import React from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, IconButton, OutlinedInput } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthForm = ({ uiData, fields }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState();
  const { title, checkText, forgotText, forgotLink } = uiData;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (key, val) => {
    setFormData({
      ...formData,
      [key]: val,
    });
  };
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, 'formData');
    router.push('/dashboard');
  };
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
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          {fields?.map((field, index) => (
            <Box key={index}>
              <Typography sx={{ mb: 1 }}>{field?.label}</Typography>
              <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
                <OutlinedInput
                  required
                  fullWidth
                  placeholder={field?.placeHolder}
                  type={
                    field?.type && field?.type == 'password'
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : null
                  }
                  onChange={(e) => handleChange(field?.label, e.target.value)}
                  endAdornment={
                    field.label == 'Password:' ? (
                      <InputAdornment position="end">
                        <IconButton
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
              </FormControl>
            </Box>
          ))}

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={checkText}
            />
            <Link href={forgotLink} variant="body2">
              {forgotText}
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {title}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AuthForm;
