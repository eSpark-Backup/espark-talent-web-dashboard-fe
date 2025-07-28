import { Box, useMediaQuery } from '@mui/system';
import { Button, CircularProgress, Grid } from '@mui/material';

import { useMutation } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';

import FormInput from '@/src/components/form/ui-elements/FormInput';

import { SETTING } from '@/src/constants/setting-hr';

import { passwordformElement } from '@/src/data/forms/password-change-form';

import { api } from '@/src/services/apiService';
import { HR_CHANGE_PASSWORD } from '@/src/services/apiService/apiEndPoints';

import { getPasswordData } from '@/src/redux/slices/hrSlices/settingsSlice';

import { passwordChangeSchema } from '@/src/validation/password';

import { Toast } from '@/src/utils/toast';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery((theme) =>
    theme.breakpoints.between('lg', 'xl')
  );
  const lgGridSize = isLargeScreen ? 3.5 : 2.6;
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    resetForm,
    setErrors,
  } = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: passwordChangeSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      mutate(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      try {
        const formData = new FormData();
        for (const key in formVals) {
          formData?.append(key, formVals[key]);
        }
        return api['updateData'](`${HR_CHANGE_PASSWORD}`, formData);
      } catch (err) {
        console.error('Error during POST request:', err);
        throw new Error(
          err?.response?.data?.message || 'Failed to update data'
        );
      }
    },
    onSuccess: (data) => {
      dispatch(getPasswordData(data || []));
      Toast('success', 'password updated successfully ');
      resetForm();
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to post data');
      console.error('Error during mutation:', {
        err: err?.message,
        name: err?.name,
        stack: err?.stack,
      });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={isSmallScreen ? 0 : 2}
        sx={{
          padding: { xs: '20px', lg: '49px 10px' },
          gap: { xs: '0px', lg: '50px' },
        }}
      >
        {passwordformElement?.map(
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
              accept,
              filelabel,
            },
            formIndex
          ) => (
            <Grid item xs={12} md={5.5} lg={lgGridSize} key={formIndex}>
              <FormInput
                title={title}
                placeholder={placeholder}
                errorText={errorText}
                prefixIcon={prefixIcon}
                type={type}
                suffixIcon={suffixIcon}
                options={options}
                name={name}
                autoComplete={formIndex?.autoComplete}
                setFieldValue={setFieldValue}
                value={values[name]}
                error={errors[name]}
                touched={touched}
                setFieldError={setFieldError}
                errors={errors}
                setErrors={setErrors}
                values={values}
                nested={nested}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                fields={fields}
                accept={accept}
                filelabel={filelabel}
              />
            </Grid>
          )
        )}
        <Grid item xs={12}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={'0 10px'}
            mt={'20px'}
          >
            <Button
              sx={{
                minWidth: '120px',
                fontSize: '16px',
              }}
              variant="contained"
              type="submit"
              disabled={
                values?.current_password === '' ||
                values?.new_password === '' ||
                values?.confirm_password === '' ||
                isPending
              }
            >
              {isPending ? (
                <CircularProgress size={26} color="secondary" />
              ) : (
                SETTING?.save
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
export default ChangePassword;
