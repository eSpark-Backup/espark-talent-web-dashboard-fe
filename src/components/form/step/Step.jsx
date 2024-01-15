import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';

const Step = ({ handleGoPrev, handleGoNext, form, isMultiColumn, schema }) => {
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
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      handleGoNext();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handeClickBack = () => {
    console.log({ values, errors });
    handleGoPrev();
  };
  if (isMultiColumn)
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            p: { xs: '20px', md: '95px 90px' },
          }}
        >
          <Grid container columnSpacing={'40px'} p={'0 10px'}>
            {form?.map(({ label, fields }, sectionIndex) => (
              <Grid xs={12} md={6} item key={sectionIndex}>
                <Box
                  sx={{
                    border: 'solid 1px #ccc',
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
                          { title, placeholder, errorText, name },
                          fieldIndex
                        ) => (
                          <FormInput
                            // mb={fieldIndex !== 0 && '40px'}
                            key={fieldIndex}
                            title={title}
                            placeholder={placeholder}
                            errorText={errorText}
                            xs={12}
                            sm={12}
                            md={12}
                            name={name}
                            setFieldValue={setFieldValue}
                            value={values[name]}
                            error={errors[name]}
                            touched={touched}
                            setFieldError={setFieldError}
                            errors={errors}
                            setErrors={setErrors}
                            values={values}
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
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={'0 10px'}
              mt={'20px'}
            >
              <Button
                onClick={handleGoPrev}
                sx={{ minWidth: '120px' }}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                // onClick={handleGoNext}
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        sx={{
          p: { xs: '20px', md: '95px 90px' },
        }}
      >
        {form?.map(
          ({
            title,
            placeholder,
            errorText,
            prefixIcon,
            type,
            suffixIcon,
            options,
            name,
            nested,
          }) => (
            <FormInput
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
            />
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
              onClick={handeClickBack}
              sx={{ minWidth: '120px' }}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              type="submit"
              sx={{ minWidth: '120px' }}
              variant="contained"
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Step;
