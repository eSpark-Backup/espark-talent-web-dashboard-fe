import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { changePasswordFormSchema } from '../form/schemas/changePassword';
import { changePasswordForm } from '@/src/constants/data/forms/change-password';
import { User_Password } from '@/src/constants/profileEditData';

const ChangePassword = () => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues: {},
    validationSchema: changePasswordFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        my: -2,
        width: { xs: '100%', md: '50%' },
      }}
    >
      <Typography variant="body2" sx={{ color: '#171717', fontWeight: '500' }}>
        {User_Password?.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid sx={{ marginLeft: '-7px' }}>
          {changePasswordForm.map(
            (
              {
                title,
                placeholder,
                errorText,
                prefixIcon,
                type,
                suffixIcon,
                options,
                name,
                nested,
                fields,
              },
              formIndex
            ) => (
              <>
                <Grid item xs={12} lg={6}>
                  <FormInput
                    key={formIndex}
                    title={title}
                    placeholder={placeholder}
                    errorText={errorText}
                    prefixIcon={prefixIcon}
                    type={type}
                    suffixIcon={suffixIcon}
                    options={options}
                    name={name}
                    setFieldValue={setFieldValue}
                    value={values[name]}
                    error={errors[name]}
                    touched={touched}
                    setFieldError={setFieldError}
                    errors={errors}
                    setErrors={setErrors}
                    values={values}
                    nested={nested}
                    md={12}
                    lg={12}
                    fields={fields}
                  />
                </Grid>
                {formIndex % 1 === 0 && <Grid item xs={12} lg={6}></Grid>}
              </>
            )
          )}
          <Grid item p={'0 10px'} xs={12}>
            <Button
              sx={{
                minWidth: '120px',
                background: '#888888',
                color: '#fff',
                '&:hover': {
                  background: '#888888',
                  color: '#fff',
                },
              }}
              type="submit"
            >
              {User_Password?.buttonText}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ChangePassword;
