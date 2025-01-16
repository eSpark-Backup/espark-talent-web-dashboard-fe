import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { SETTING } from '@/src/constants/SettingHr';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { usePathname } from 'next/navigation';
import { Toast } from '../../Toast/Toast';

const Step = ({
  handleGoPrev,
  handleGoNext,
  form,
  isMultiColumn,
  schema,
  pmd = '95px 90px',
  editProfile,
  countries,
  mt,
  gap,
  midScreenGap,
  isLastStep,
  countNo,
  defaultValues,
  getFinalData,
  dispatchFunction,
  method,
  endpoint,
  clearForm,
  navigateFunc,
  toast,
  setCurrentStep,
  errorToast,
  marginLeft,
  marginRight,
  onSave,
  btnSave,
  fontSize,
  miniFontSize,
}) => {
  const pathname = usePathname();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formDataVals = new FormData();
      for (const key in formVals) {
        formDataVals.append(key, formVals[key]);
      }
      return api[method](endpoint, formDataVals);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Status updated successfully');
      console.log({ data });
      setCurrentStep?.(0);
      toast?.();
      clearForm?.();
      navigateFunc?.();
      onSave();
    },
    onError: (err) => {
      let errToast;
      const responseValues = Object.values(err?.response?.data);
      const firstResponseValue =
        responseValues.length > 0 ? responseValues[0] : null;

      if (firstResponseValue) {
        const formattedErrors = formatErrors(err?.response?.data);

        if (['/hr_add_emp/', '/hr_add_client/'].includes(endpoint)) {
          if (
            Array.isArray(firstResponseValue) &&
            firstResponseValue.length > 0
          ) {
            errToast = formattedErrors;
          } else {
            errToast = firstResponseValue;
          }
        } else {
          errToast = Array.isArray(firstResponseValue)
            ? formattedErrors
            : firstResponseValue;
        }
      } else {
        errToast = 'An unknown error occurred';
      }
      if (errToast) {
        errorToast(errToast);
      }
    },
  });

  const formatErrors = (error) => {
    return Object.keys(error)
      .map((key) => {
        // Replace underscores with spaces and capitalize each word
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
        // Join all error messages for the key
        const errorMessage = error[key].join(', ');
        // Return the formatted error message with bold key
        return `<strong>${formattedKey}:</strong> ${errorMessage}`;
      })
      .join('<br>');
  };

  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues: {
      ...defaultValues,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      dispatchFunction?.(formValues);
      handleGoNext?.();
      if (isLastStep) {
        const newData = getFinalData({
          ...defaultValues,
          ...formValues,
          gender:
            formValues?.gender == 'Not specific'
              ? 'nonspec'
              : formValues?.gender,
        });
        mutate(newData);
      }
      btnSave(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handeClickBack = () => {
    dispatchFunction?.(values);
    handleGoPrev();
  };

  if (isMultiColumn)
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            p: { xs: '20px', md: '95px 90px' },
            '@media (min-width: 350px) and (max-width: 900px)': {
              p: '40px',
            },
          }}
        >
          <Grid container columnSpacing={'40px'} p={'0 10px'}>
            {form?.map(({ label, fields }, sectionIndex) => (
              <Grid
                sx={{ mb: { xs: sectionIndex === 0 && '40px', md: 0 } }}
                xs={12}
                md={6}
                item
                key={sectionIndex}
              >
                <Box
                  sx={{
                    border: 'solid 1px #E4E4E4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      background: '#CFF0F0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: '10px 0',
                      mb: '20px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#171717',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  <Box>
                    <Grid
                      container
                      sx={{
                        p: { xs: '20px 20px', xl: '35px 100px' },
                      }}
                    >
                      {fields?.map(
                        (
                          { title, placeholder, errorText, name, accept },
                          fieldIndex
                        ) => (
                          <FormInput
                            key={fieldIndex}
                            title={title}
                            placeholder={placeholder}
                            errorText={errorText}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            name={name}
                            setFieldValue={setFieldValue}
                            value={values[name]}
                            error={errors[name]}
                            touched={touched}
                            setFieldError={setFieldError}
                            errors={errors}
                            setErrors={setErrors}
                            values={values}
                            width={'70%'}
                            accept={accept}
                            disabled={
                              (name == 'starting_date' &&
                                (values.job_status == 'Part-Time' ||
                                  values.job_status == 'Permanent')) ||
                              (name == 'ending_date' &&
                                (values.job_status == 'Part-Time' ||
                                  values.job_status == 'Permanent'))
                                ? true
                                : false
                            }
                            marginLeft={marginLeft}
                            marginRight={marginRight}
                          />
                        )
                      )}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Box
              p={'0 10px'}
              mt={'20px'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                onClick={handeClickBack}
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  mb: { xs: '20px', md: '0' },
                  fontSize: '16px',
                }}
                variant={countNo === 1 ? 'outlined' : 'contained'}
              >
                {FORM_DATA?.back}
              </Button>
              <Button
                type="submit"
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  fontSize: '16px',
                }}
                variant="contained"
              >
                {FORM_DATA?.next}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        spacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        container
        sx={{
          p: { xs: '20px', md: '60px 45px', lg: '70px 45px', xl: pmd },
          display: 'flex',
          gap: gap ? gap : 0,
          '@media (min-width: 280px) and (max-width: 1460px)': {
            gap: midScreenGap ? midScreenGap : 0,
          },
        }}
      >
        {form?.map(
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
              searchable,
              accept,
              withFlag,
              min,
              max,
              filelabel,
              selectWithType,
            },
            formIndex
          ) => (
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
              xs={12}
              sm={6}
              md={3.5}
              lg={3}
              countries={countries}
              withFlag={withFlag}
              searchable={searchable}
              accept={accept}
              min={min}
              max={max}
              disabled={
                (name == 'starting_date' &&
                  (values.job_status == 'Part-Time' ||
                    values.job_status == 'Permanent')) ||
                (pathname == '/hr/dashboard/clients/edit-profile' &&
                  name == 'email') ||
                (name == 'ending_date' &&
                  (values.job_status == 'Part-Time' ||
                    values.job_status == 'Permanent'))
                  ? true
                  : false
              }
              filelabel={filelabel}
              marginLeft={marginLeft}
              marginRight={marginRight}
              fontSize={fontSize}
              miniFontSize={miniFontSize}
              selectWithType={selectWithType}
            />
          )
        )}
        {editProfile ? (
          <Grid item xs={12}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={'0 10px'}
              mt={'20px'}
            >
              <Button
                type="submit"
                sx={{
                  minWidth: '120px',
                  marginTop: mt,
                  fontSize: '16px',
                  backgroundColor: '#029894',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#029894',
                    color: '#fff',
                  },
                }}
                variant="contained"
                disabled={isLastStep && isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  SETTING?.save
                )}
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box
              p={'0 10px'}
              mt={'20px'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              {countNo > 1 ? (
                <Button
                  onClick={handeClickBack}
                  sx={{
                    minWidth: { xs: '100%', sm: '120px' },
                    mb: { xs: '20px', md: '0' },
                    fontSize: '16px',
                    mt: { xs: '0px', md: countNo === 2 ? mt : '0px' },
                  }}
                  variant={countNo === 1 ? 'outlined' : 'contained'}
                >
                  {FORM_DATA?.back}
                </Button>
              ) : (
                <Box />
              )}
              <Button
                type="submit"
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  fontSize: '16px',
                  mt: { xs: '0px', md: countNo === 2 ? mt : '0px' },
                }}
                disabled={isLastStep && isPending}
                variant="contained"
              >
                {!isLastStep ? (
                  'Next'
                ) : isLastStep && isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  'Submit'
                )}
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Step;
